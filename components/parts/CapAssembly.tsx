"use client";

import type { CapColors } from "../materials/capMaterials";
import CapCrown from "./CapCrown";
import CapInterior from "./CapInterior";
import CapDesign from "./CapDesign";

export type CapAssemblyProps = {
  colors?: CapColors;
  artworkUrl?: string;
  /** The source's design-body mesh exactly overlaps design; keep hidden to avoid z-fighting. */
  showDesignBody?: boolean;
};

export default function CapAssembly({
  colors = {},
  artworkUrl,
  showDesignBody = false,
}: CapAssemblyProps) {
  return (
    <group name="cap-assembly">
      <CapCrown colors={colors} />
      <CapInterior colors={colors} />
      <CapDesign
        colors={colors}
        artworkUrl={artworkUrl}
        showDesignBody={showDesignBody}
      />
    </group>
  );
}
