"use client";

import type { CapColors } from "../materials/capMaterials";
import CapMesh from "./CapMesh";

const CROWN_MESHES = ["cap-front", "cap-back", "cap-point", "cap-top"] as const;

export default function CapCrown({ colors }: { colors: CapColors }) {
  return <CapMesh meshNames={CROWN_MESHES} colors={colors} />;
}
