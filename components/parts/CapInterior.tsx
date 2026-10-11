"use client";

import type { CapColors } from "../materials/capMaterials";
import CapMesh from "./CapMesh";

const INTERIOR_MESHES = ["cap-inside", "cap-sweatband"] as const;

export default function CapInterior({ colors }: { colors: CapColors }) {
  return <CapMesh meshNames={INTERIOR_MESHES} colors={colors} />;
}
