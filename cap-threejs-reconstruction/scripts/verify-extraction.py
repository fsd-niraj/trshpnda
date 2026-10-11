#!/usr/bin/env python3
"""Verify the generated TypeScript buffers are byte-identical to GLB accessors."""
import base64, json, re, struct, sys
from pathlib import Path

source = Path(sys.argv[1])
generated = Path(sys.argv[2])
b = source.read_bytes()
_, version, length = struct.unpack_from('<4sII', b, 0)
assert version == 2 and length == len(b), 'Not a valid GLB 2.0 file'
offset = 12; doc = None; binary = None
while offset < len(b):
    n, typ = struct.unpack_from('<I4s', b, offset); offset += 8
    chunk = b[offset:offset+n]; offset += n
    if typ == b'JSON': doc = json.loads(chunk.decode().rstrip('\x00 '))
    elif typ == b'BIN\x00': binary = chunk
assert doc is not None and binary is not None
text = generated.read_text()
match = re.search(r'CAP_MESHES: EncodedCapMesh\[\] = (\[.*\]) as EncodedCapMesh\[\];', text, re.S)
assert match, 'Cannot locate generated mesh array'
meshes = json.loads(match.group(1))
node_names = {node['mesh']: node.get('name') for node in doc['nodes'] if 'mesh' in node}
assert len(meshes) == len(doc['meshes']) == 8

component_sizes = {5120:1,5121:1,5122:2,5123:2,5125:4,5126:4}
type_counts = {'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT2':4,'MAT3':9,'MAT4':16}
checked = 0
for mesh_i, mesh in enumerate(doc['meshes']):
    actual = meshes[mesh_i]
    assert actual['name'] == node_names[mesh_i], (actual['name'], node_names[mesh_i])
    primitive = mesh['primitives'][0]
    attrs = [('positions','POSITION'),('normals','NORMAL'),('uvs','TEXCOORD_0'),('indices','indices')]
    for field, attr_name in attrs:
        accessor_i = primitive['indices'] if attr_name == 'indices' else primitive['attributes'][attr_name]
        accessor = doc['accessors'][accessor_i]
        view = doc['bufferViews'][accessor['bufferView']]
        item_size = component_sizes[accessor['componentType']] * type_counts[accessor['type']]
        stride = view.get('byteStride', item_size)
        start = view.get('byteOffset', 0) + accessor.get('byteOffset', 0)
        if stride == item_size:
            raw = binary[start:start + accessor['count'] * item_size]
        else:
            raw = b''.join(binary[start+i*stride:start+i*stride+item_size] for i in range(accessor['count']))
        extracted = base64.b64decode(actual[field]['data'])
        assert extracted == raw, f"Buffer mismatch: {actual['name']} {field}"
        assert actual[field]['count'] == accessor['count']
        checked += 1

print(f'PASS: {len(meshes)} meshes; {checked} geometry buffers byte-identical to source GLB accessors.')
print('PASS: position, normal, UV, and index buffers all verified.')
