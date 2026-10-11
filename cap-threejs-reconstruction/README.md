# Cap Three.js reconstruction

This package renders the supplied cap mesh without fetching or loading a `.glb` at runtime. The original GLB's mesh attributes are embedded in `src/components/cap/generated/capGeometryData.ts`.

## Use in Next.js

Install dependencies listed in `package.json`, then copy `src/components/cap` into your app. Import the viewer:

```tsx
import { CapViewer, DEFAULT_CAP_COLORS } from "@/components/cap";

export default function ProductPage() {
  return <CapViewer colors={{ ...DEFAULT_CAP_COLORS, front: "#273b2e", back: "#273b2e", crown: "#273b2e" }} />;
}
```

Optional design artwork:

```tsx
<CapViewer artworkUrl="/designs/classic-logo.png" />
```

The source GLB's `design` and `design-body` meshes have identical positions, normals, UVs, and indices. To avoid z-fighting, `design-body` is hidden by default and `design` is shown. Verify the artwork UV layout before using real product artwork.

## Regenerate geometry data

The extraction script is a development-time tool. It requires only Python 3:

```bash
python scripts/extract-glb-geometry.py /path/to/3DcapModel.glb src/components/cap/generated/capGeometryData.ts
```

The original GLB is not needed by the browser at runtime. Geometry is embedded in a generated TypeScript module; the model's geometry has not been approximated or procedurally reshaped.

## Fidelity and limitations

- The eight source meshes, vertex positions, normals, UVs, and triangle indices are preserved from the GLB.
- The supplied GLB contains no embedded image textures; materials are initialized as configurable fabric-like PBR materials. Artwork/fabric maps must be supplied separately.
- The source model has no separately named thread or strap mesh in the inspected mesh list. The initial assembly groups the source meshes into crown, interior, and design layers while preserving their exact source geometry. Strap and thread additions should be modeled as separate follow-up components only after the source mesh is visually inspected from all angles; guessed seam paths would reduce fidelity.
- `design-body` and `design` are coincident duplicates; show both only if a later material/opacity setup intentionally requires it.
