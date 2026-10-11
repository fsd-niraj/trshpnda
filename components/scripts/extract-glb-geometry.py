#!/usr/bin/env python3
"""Extract GLB mesh buffers into a TypeScript module for runtime GLB-free rendering.

Development-time only. Requires Python 3 and no third-party packages.
"""
import base64
import json
import struct
import sys
from pathlib import Path

COMPONENTS = {5120: ('Int8Array', 'b'), 5121: ('Uint8Array', 'B'),
              5122: ('Int16Array', 'h'), 5123: ('Uint16Array', 'H'),
              5125: ('Uint32Array', 'I'), 5126: ('Float32Array', 'f')}
TYPE_SIZE = {5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4}
TYPE_COUNT = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT2': 4, 'MAT3': 9, 'MAT4': 16}


def read_glb(path: Path):
    data = path.read_bytes()
    magic, version, total_length = struct.unpack_from('<4sII', data, 0)
    if magic != b'glTF' or version != 2 or total_length != len(data):
        raise ValueError('Expected a valid GLB 2.0 file')
    offset = 12
    document = None
    binary = None
    while offset < len(data):
        chunk_length, chunk_type = struct.unpack_from('<I4s', data, offset)
        offset += 8
        chunk = data[offset:offset + chunk_length]
        offset += chunk_length
        if chunk_type == b'JSON':
            document = json.loads(chunk.decode('utf-8').rstrip('\x00 '))
        elif chunk_type == b'BIN\x00':
            binary = chunk
    if document is None or binary is None:
        raise ValueError('GLB is missing JSON or BIN chunk')
    return document, binary


def accessor_bytes(doc, binary, accessor_index):
    accessor = doc['accessors'][accessor_index]
    view = doc['bufferViews'][accessor['bufferView']]
    component_type = accessor['componentType']
    item_size = TYPE_SIZE[component_type] * TYPE_COUNT[accessor['type']]
    stride = view.get('byteStride', item_size)
    start = view.get('byteOffset', 0) + accessor.get('byteOffset', 0)
    count = accessor['count']
    if stride == item_size:
        raw = binary[start:start + count * item_size]
    else:
        # Convert strided attributes to tightly packed arrays.
        raw = b''.join(binary[start + i * stride:start + i * stride + item_size] for i in range(count))
    return raw, accessor


def main():
    if len(sys.argv) != 3:
        raise SystemExit('Usage: extract-glb-geometry.py input.glb output.ts')
    input_path, output_path = map(Path, sys.argv[1:])
    doc, binary = read_glb(input_path)
    node_by_mesh = {node['mesh']: node.get('name', f"mesh-{node['mesh']}")
                    for node in doc.get('nodes', []) if 'mesh' in node}
    entries = []
    for mesh_index, mesh in enumerate(doc['meshes']):
        node_name = node_by_mesh.get(mesh_index, mesh.get('name', f'mesh-{mesh_index}'))
        primitive = mesh['primitives'][0]
        attrs = primitive['attributes']
        attr_names = [('positions', 'POSITION'), ('normals', 'NORMAL'), ('uvs', 'TEXCOORD_0')]
        entry = {'name': node_name, 'materialIndex': primitive.get('material', 0)}
        for output_name, gltf_name in attr_names:
            raw, accessor = accessor_bytes(doc, binary, attrs[gltf_name])
            entry[output_name] = {
                'arrayType': COMPONENTS[accessor['componentType']][0],
                'count': accessor['count'],
                'itemSize': TYPE_COUNT[accessor['type']],
                'data': base64.b64encode(raw).decode('ascii'),
            }
        raw, accessor = accessor_bytes(doc, binary, primitive['indices'])
        entry['indices'] = {
            'arrayType': COMPONENTS[accessor['componentType']][0],
            'count': accessor['count'],
            'itemSize': 1,
            'data': base64.b64encode(raw).decode('ascii'),
        }
        entry['vertexCount'] = doc['accessors'][attrs['POSITION']]['count']
        entry['indexCount'] = doc['accessors'][primitive['indices']]['count']
        entries.append(entry)

    output = '''/* AUTO-GENERATED from the supplied GLB by scripts/extract-glb-geometry.py.
 * Runtime renderer uses these embedded buffers and does not fetch a GLB.
 * Do not hand-edit this file; regenerate it from the source model.
 */
export type EncodedAttribute = {
  arrayType: "Float32Array" | "Uint8Array" | "Uint16Array" | "Uint32Array" | "Int8Array" | "Int16Array";
  count: number;
  itemSize: number;
  data: string;
};
export type EncodedCapMesh = {
  name: string;
  materialIndex: number;
  vertexCount: number;
  indexCount: number;
  positions: EncodedAttribute;
  normals: EncodedAttribute;
  uvs: EncodedAttribute;
  indices: EncodedAttribute;
};
export const CAP_MESHES: EncodedCapMesh[] = ''' + json.dumps(entries, separators=(',', ':')) + ''' as EncodedCapMesh[];
'''
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(output)
    print(f'Wrote {output_path} ({output_path.stat().st_size:,} bytes) with {len(entries)} meshes')
    for entry in entries:
        print(f"{entry['name']}: {entry['vertexCount']:,} vertices, {entry['indexCount']:,} indices")

if __name__ == '__main__':
    main()
