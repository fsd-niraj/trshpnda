"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { CAP_MESHES, type EncodedCapMesh } from "../generated/capGeometryData";
import { createCapGeometry } from "../geometry/createCapGeometry";
import { createCapMaterial, MESH_TO_SLOT, type CapColors } from "../materials/capMaterials";

export type CapMeshProps = {
  meshNames: readonly string[];
  colors: CapColors;
  artworkUrl?: string;
};

const geometryCache = new Map<string, THREE.BufferGeometry>();

function getGeometry(mesh: EncodedCapMesh) {
  let geometry = geometryCache.get(mesh.name);
  if (!geometry) {
    geometry = createCapGeometry(mesh);
    geometryCache.set(mesh.name, geometry);
  }
  return geometry;
}

export default function CapMesh({ meshNames, colors, artworkUrl }: CapMeshProps) {
  const meshes = useMemo(
    () => CAP_MESHES.filter((mesh) => meshNames.includes(mesh.name)),
    [meshNames]
  );

  const materialByName = useMemo(() => {
    const result = new Map<string, THREE.MeshStandardMaterial>();
    for (const mesh of meshes) {
      const slot = MESH_TO_SLOT[mesh.name];
      result.set(mesh.name, createCapMaterial(colors[slot] ?? "#30312f"));
    }
    return result;
  }, [colors, meshes]);

  useEffect(() => {
    let cancelled = false;
    let texture: THREE.Texture | undefined;
    const designMaterial = materialByName.get("design");
    if (!artworkUrl || !designMaterial) return;

    const loader = new THREE.TextureLoader();
    loader.load(
      artworkUrl,
      (loaded) => {
        if (cancelled) {
          loaded.dispose();
          return;
        }
        texture = loaded;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        designMaterial.map = texture;
        designMaterial.color.set("#ffffff");
        designMaterial.needsUpdate = true;
      },
      undefined,
      (error) => console.error("Unable to load cap artwork texture", error)
    );

    return () => {
      cancelled = true;
      texture?.dispose();
      if (designMaterial.map === texture) {
        designMaterial.map = null;
        designMaterial.needsUpdate = true;
      }
    };
  }, [artworkUrl, materialByName]);

  useEffect(() => () => {
    materialByName.forEach((material) => material.dispose());
  }, [materialByName]);

  return (
    <group name={`cap-part-${meshNames.join("-")}`}>
      {meshes.map((mesh) => (
        <mesh
          key={mesh.name}
          name={mesh.name}
          geometry={getGeometry(mesh)}
          material={materialByName.get(mesh.name)!}
          castShadow
          receiveShadow
          frustumCulled
        />
      ))}
    </group>
  );
}
