"use client";

import type { CapColors } from "../materials/capMaterials";
import CapMesh from "./CapMesh";

const DESIGN_MESHES = ["design"] as const;
const DESIGN_BODY_MESHES = ["design-body"] as const;

export default function CapDesign({
  colors,
  artworkUrl,
  showDesignBody = false,
}: {
  colors: CapColors;
  artworkUrl?: string;
  showDesignBody?: boolean;
}) {
  return (
    <group name="cap-design-layers">
      {showDesignBody && (
        <CapMesh meshNames={DESIGN_BODY_MESHES} colors={colors} />
      )}
      <CapMesh
        meshNames={DESIGN_MESHES}
        colors={colors}
        artworkUrl={artworkUrl}
      />
    </group>
  );
}
