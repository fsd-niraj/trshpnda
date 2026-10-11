import * as THREE from "three";
import type { EncodedAttribute, EncodedCapMesh } from "../generated/capGeometryData";

function decodeBase64(value: string): Uint8Array {
  // This module is used by a client component, so browser atob is available.
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function typedArray(attribute: EncodedAttribute): ArrayBufferView {
  const bytes = decodeBase64(attribute.data);
  // Copy to an aligned buffer before constructing multi-byte typed arrays.
  const aligned = bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  );

  switch (attribute.arrayType) {
    case "Float32Array": return new Float32Array(aligned);
    case "Uint8Array": return new Uint8Array(aligned);
    case "Uint16Array": return new Uint16Array(aligned);
    case "Uint32Array": return new Uint32Array(aligned);
    case "Int8Array": return new Int8Array(aligned);
    case "Int16Array": return new Int16Array(aligned);
  }
}

export function createCapGeometry(mesh: EncodedCapMesh): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(typedArray(mesh.positions) as THREE.BufferAttribute["array"], 3)
  );
  geometry.setAttribute(
    "normal",
    new THREE.BufferAttribute(typedArray(mesh.normals) as THREE.BufferAttribute["array"], 3)
  );
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(typedArray(mesh.uvs) as THREE.BufferAttribute["array"], 2)
  );
  geometry.setIndex(
    new THREE.BufferAttribute(typedArray(mesh.indices) as THREE.BufferAttribute["array"], 1)
  );
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}
