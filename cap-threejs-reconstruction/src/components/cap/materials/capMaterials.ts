import * as THREE from "three";

export type CapColors = Partial<Record<CapMaterialSlot, string>>;
export type CapMaterialSlot =
  | "crown"
  | "front"
  | "back"
  | "top"
  | "interior"
  | "sweatband"
  | "designBody"
  | "design";

export const DEFAULT_CAP_COLORS: Record<CapMaterialSlot, string> = {
  crown: "#30312f",
  front: "#30312f",
  back: "#30312f",
  top: "#30312f",
  interior: "#20211f",
  sweatband: "#252623",
  designBody: "#30312f",
  design: "#30312f",
};

export const MESH_TO_SLOT: Record<string, CapMaterialSlot> = {
  "cap-back": "back",
  "cap-point": "crown",
  "cap-front": "front",
  "cap-top": "top",
  "cap-inside": "interior",
  "cap-sweatband": "sweatband",
  "design-body": "designBody",
  design: "design",
};

export function createCapMaterial(color: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.88,
    metalness: 0,
    side: THREE.DoubleSide,
  });
}
