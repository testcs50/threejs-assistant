import * as THREE from "three";
import create from "zustand";

export const geometriesMap = {
  BoxGeometry: THREE.BoxGeometry,
  CircleGeometry: THREE.CircleGeometry,
  ConeGeometry: THREE.ConeGeometry,
  CylinderGeometry: THREE.CylinderGeometry,
  DodecahedronGeometry: THREE.DodecahedronGeometry,
  IcosahedronGeometry: THREE.IcosahedronGeometry,
  OctahedronGeometry: THREE.OctahedronGeometry,
  PlaneGeometry: THREE.PlaneGeometry,
  SphereGeometry: THREE.SphereGeometry,
  TetrahedronGeometry: THREE.TetrahedronGeometry,
  TorusGeometry: THREE.TorusGeometry,
  TorusKnotGeometry: THREE.TorusKnotGeometry,
  LatheGeometry: THREE.LatheGeometry,
  TubeGeometry: THREE.TubeGeometry,
  ExtrudeGeometry: THREE.ExtrudeGeometry,
  RingGeometry: THREE.RingGeometry,
  ShapeGeometry: THREE.ShapeGeometry,
};

export const materialsMap = {
  MeshBasicMaterial: THREE.MeshBasicMaterial,
  MeshDepthMaterial: THREE.MeshDepthMaterial,
  MeshLambertMaterial: THREE.MeshLambertMaterial,
  MeshMatcapMaterial: THREE.MeshMatcapMaterial,
  MeshNormalMaterial: THREE.MeshNormalMaterial,
  MeshPhongMaterial: THREE.MeshPhongMaterial,
  MeshPhysicalMaterial: THREE.MeshPhysicalMaterial,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  MeshToonMaterial: THREE.MeshToonMaterial,
  PointsMaterial: THREE.PointsMaterial,
  ShadowMaterial: THREE.ShadowMaterial,
  SpriteMaterial: THREE.SpriteMaterial,
};

type ThreeState = {
  count: number;
};

type ThreeActions = {
  incrementCount: () => void;
};

type MeshConfig = {
  material: string;
  geometry: string;
  x?: number;
  y?: number;
  z?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

type MaterialConfig = {
  [K in keyof typeof materialsMap]: { name: K } & Partial<
    InstanceType<(typeof THREE)[K]>
  >;
}[keyof typeof materialsMap];

type GeometriesConfig = {
  [K in keyof typeof geometriesMap]: { name: K } & Partial<
    InstanceType<(typeof THREE)[K]>["parameters"]
  >;
}[keyof typeof geometriesMap];

const initialState: ThreeState = {
  count: 0,
};

export const useThreeStore = create<ThreeState & ThreeActions>((set) => ({
  ...initialState,
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
}));

export const incrementCount = () => useThreeStore.getState().incrementCount();

export const MaterialsHash = new Map<string, MaterialConfig>();
export const GeometriesHash = new Map<string, GeometriesConfig>();
export const MeshesHash = new Map<string, MeshConfig>();
