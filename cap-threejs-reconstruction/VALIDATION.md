# Source geometry validation

## Source model preview

`source-model-preview.png` is an offscreen render of the supplied `3DcapModel.glb` used to inspect the overall silhouette, crown panels, eyelets, top button, and brim stitching before coding.

## Exact data comparison

The extraction script copies source GLB accessors directly into `generated/capGeometryData.ts` as Base64-encoded buffers. `scripts/verify-extraction.py` compares every decoded output buffer against its original GLB accessor.

Verified: **8 meshes and 32 buffers match byte-for-byte** (position, normal, UV, index buffers for every mesh).

| Source mesh | Vertices | Triangles |
|---|---:|---:|
| `cap-back` | 3,569 | 5,568 |
| `cap-point` | 3,336 | 4,400 |
| `cap-front` | 1,722 | 3,248 |
| `cap-top` | 2,002 | 3,456 |
| `cap-inside` | 12,160 | 21,336 |
| `cap-sweatband` | 179,952 | 117,712 |
| `design-body` | 8,016 | 13,637 |
| `design` | 8,016 | 13,637 |

`design` and `design-body` have identical positions, normals, UVs, and triangle indices. The viewer hides `design-body` by default to avoid z-fighting.

## Compile/check status

- TypeScript/TSX syntax transpilation: passed for all 10 source files.
- Geometry extraction integrity: passed for all 32 buffers.
- Full TypeScript typecheck/build: **not run successfully in this environment**, because npm dependency installation timed out and `three`, React, and React Three Fiber are not installed here. Run `npm install` and `npm run typecheck` in the project or your Next.js repository.

## Important fidelity distinction

The cap's original geometry is preserved exactly; it is not rebuilt from guessed primitives. Its GLB has no embedded image textures. The supplied mesh list has no independent strap or thread mesh by name, so those are not fabricated in this first pass. The visible seams/stitch-like details in the preview are preserved as part of the source geometry. Independent strap/thread customization requires inspecting and separating geometry or adding new details in a follow-up step.
