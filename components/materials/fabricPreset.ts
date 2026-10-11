import type { Texture } from 'three';

export type FabricPreset = {
  baseColor: string;
  baseColorMap: string;
  normalMap: string;
  roughnessMap: string;
  roughness: number;
  normalScale: number;
  repeat: [number, number];
};

export const FABRIC_PRESETS: Record<string, FabricPreset> = {
  mesh: {
    baseColor: '#ffffff',
    baseColorMap: '/textures/mesh/basecolor.jpg',
    normalMap: '/textures/mesh/normal.jpg',
    roughnessMap: '/textures/mesh/roughness.jpg',
    roughness: 0.9,
    normalScale: 0.35,
    repeat: [4, 4],
  },
  suede: {
    baseColor: '#ffffff',
    baseColorMap: '/textures/suede/basecolor.jpg',
    normalMap: '/textures/suede/normal.jpg',
    roughnessMap: '/textures/suede/roughness.jpg',
    roughness: 0.95,
    normalScale: 0.2,
    repeat: [3, 3],
  },
  denim: {
    baseColor: '#ffffff',
    baseColorMap: '/textures/denim/basecolor.jpg',
    normalMap: '/textures/denim/normal.jpg',
    roughnessMap: '/textures/denim/roughness.jpg',
    roughness: 0.9,
    normalScale: 0.3,
    repeat: [4, 4],
  },
};
