import { z } from "zod";
import { DynamicStructuredTool } from "langchain/tools";
import { GeometriesHash } from "../../store/three";

export const geometriesTools = [
  // BoxGeometry
  new DynamicStructuredTool({
    name: "create-a-box-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      width: z.number().describe("width of the box"),
      height: z.number().describe("height of the box"),
      depth: z.number().describe("depth of the box"),
      widthSegments: z.number().describe("widthSegments of the box"),
      heightSegments: z.number().describe("heightSegments of the box"),
      depthSegments: z.number().describe("depthSegments of the box"),
    }),
    description: `Creates a threejs BoxGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({
      key,
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments,
    }) => {
      const output = `created a box geometry with key ${key} and width ${width} and height ${height} and depth ${depth} and widthSegments ${widthSegments} and heightSegments ${heightSegments} and depthSegments ${depthSegments}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "BoxGeometry",
        width,
        height,
        depth,
        widthSegments,
        heightSegments,
        depthSegments,
      });
      return output;
    },
  }),
  // CircleGeometry
  new DynamicStructuredTool({
    name: "create-a-circle-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the circle"),
      segments: z.number().describe("segments of the circle"),
      thetaStart: z.number().describe("thetaStart of the circle"),
      thetaLength: z.number().describe("thetaLength of the circle"),
    }),
    description: `Creates a threejs CircleGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({ key, radius, segments, thetaStart, thetaLength }) => {
      const output = `created a circle geometry with key ${key} and radius ${radius} and segments ${segments} and thetaStart ${thetaStart} and thetaLength ${thetaLength}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "CircleGeometry",
        radius,
        segments,
        thetaStart,
        thetaLength,
      });
      return output;
    },
  }),
  // ConeGeometry
  new DynamicStructuredTool({
    name: "create-a-cone-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the cone"),
      height: z.number().describe("height of the cone"),
      radialSegments: z.number().describe("radialSegments of the cone"),
      heightSegments: z.number().describe("heightSegments of the cone"),
      openEnded: z.boolean().describe("openEnded of the cone"),
      thetaStart: z.number().describe("thetaStart of the cone"),
      thetaLength: z.number().describe("thetaLength of the cone"),
    }),
    description: `Creates a threejs ConeGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({
      key,
      radius,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
    }) => {
      const output = `created a cone geometry with key ${key} and radius ${radius} and height ${height} and radialSegments ${radialSegments} and heightSegments ${heightSegments} and openEnded ${openEnded} and thetaStart ${thetaStart} and thetaLength ${thetaLength}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "ConeGeometry",
        radius,
        height,
        radialSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength,
      });
      return output;
    },
  }),
  // CylinderGeometry
  new DynamicStructuredTool({
    name: "create-a-cylinder-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radiusTop: z.number().describe("radiusTop of the cylinder"),
      radiusBottom: z.number().describe("radiusBottom of the cylinder"),
      height: z.number().describe("height of the cylinder"),
      radialSegments: z.number().describe("radialSegments of the cylinder"),
      heightSegments: z.number().describe("heightSegments of the cylinder"),
      openEnded: z.boolean().describe("openEnded of the cylinder"),
      thetaStart: z.number().describe("thetaStart of the cylinder"),
      thetaLength: z.number().describe("thetaLength of the cylinder"),
    }),
    description: `Creates a threejs CylinderGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({
      key,
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
    }) => {
      const output = `created a cylinder geometry with key ${key} and radiusTop ${radiusTop} and radiusBottom ${radiusBottom} and height ${height} and radialSegments ${radialSegments} and heightSegments ${heightSegments} and openEnded ${openEnded} and thetaStart ${thetaStart} and thetaLength ${thetaLength}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "CylinderGeometry",
        radiusTop,
        radiusBottom,
        height,
        radialSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength,
      });
      return output;
    },
  }),
  // DodecahedronGeometry
  new DynamicStructuredTool({
    name: "create-a-dodecahedron-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the dodecahedron"),
      detail: z.number().describe("detail of the dodecahedron"),
    }),
    description: `Creates a threejs DodecahedronGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({ key, radius, detail }) => {
      const output = `created a dodecahedron geometry with key ${key} and radius ${radius} and detail ${detail}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "DodecahedronGeometry",
        radius,
        detail,
      });
      return output;
    },
  }),
  // IcosahedronGeometry
  new DynamicStructuredTool({
    name: "create-a-icosahedron-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the icosahedron"),
      detail: z.number().describe("detail of the icosahedron"),
    }),
    description: `Creates a threejs IcosahedronGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({ key, radius, detail }) => {
      const output = `created a icosahedron geometry with key ${key} and radius ${radius} and detail ${detail}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "IcosahedronGeometry",
        radius,
        detail,
      });
      return output;
    },
  }),
  // OctahedronGeometry
  new DynamicStructuredTool({
    name: "create-a-octahedron-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the octahedron"),
      detail: z.number().describe("detail of the octahedron"),
    }),
    description: `Creates a threejs OctahedronGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({ key, radius, detail }) => {
      const output = `created a octahedron geometry with key ${key} and radius ${radius} and detail ${detail}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "OctahedronGeometry",
        radius,
        detail,
      });
      return output;
    },
  }),
  // PlaneGeometry
  new DynamicStructuredTool({
    name: "create-a-plane-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      width: z.number().describe("width of the plane"),
      height: z.number().describe("height of the plane"),
      widthSegments: z.number().describe("widthSegments of the plane"),
      heightSegments: z.number().describe("heightSegments of the plane"),
    }),
    description: `Creates a threejs PlaneGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({ key, width, height, widthSegments, heightSegments }) => {
      const output = `created a plane geometry with key ${key} and width ${width} and height ${height} and widthSegments ${widthSegments} and heightSegments ${heightSegments}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "PlaneGeometry",
        width,
        height,
        widthSegments,
        heightSegments,
      });
      return output;
    },
  }),
  // SphereGeometry
  new DynamicStructuredTool({
    name: "create-a-sphere-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the sphere"),
      widthSegments: z.number().describe("widthSegments of the sphere"),
      heightSegments: z.number().describe("heightSegments of the sphere"),
      phiStart: z.number().describe("phiStart of the sphere"),
      phiLength: z.number().describe("phiLength of the sphere"),
      thetaStart: z.number().describe("thetaStart of the sphere"),
      thetaLength: z.number().describe("thetaLength of the sphere"),
    }),
    description: `Creates a threejs SphereGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({
      key,
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength,
    }) => {
      const output = `created a sphere geometry with key ${key} and radius ${radius} and widthSegments ${widthSegments} and heightSegments ${heightSegments} and phiStart ${phiStart} and phiLength ${phiLength} and thetaStart ${thetaStart} and thetaLength ${thetaLength}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "SphereGeometry",
        radius,
        widthSegments,
        heightSegments,
        phiStart,
        phiLength,
        thetaStart,
        thetaLength,
      });
      return output;
    },
  }),
  // TetrahedronGeometry
  new DynamicStructuredTool({
    name: "create-a-tetrahedron-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the tetrahedron"),
      detail: z.number().describe("detail of the tetrahedron"),
    }),
    description: `Creates a threejs TetrahedronGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({ key, radius, detail }) => {
      const output = `created a tetrahedron geometry with key ${key} and radius ${radius} and detail ${detail}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "TetrahedronGeometry",
        radius,
        detail,
      });
      return output;
    },
  }),
  // TorusGeometry
  new DynamicStructuredTool({
    name: "create-a-torus-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the torus"),
      tube: z.number().describe("tube of the torus"),
      radialSegments: z.number().describe("radialSegments of the torus"),
      tubularSegments: z.number().describe("tubularSegments of the torus"),
      arc: z.number().describe("arc of the torus"),
    }),
    description: `Creates a threejs TorusGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({
      key,
      radius,
      tube,
      radialSegments,
      tubularSegments,
      arc,
    }) => {
      const output = `created a torus geometry with key ${key} and radius ${radius} and tube ${tube} and radialSegments ${radialSegments} and tubularSegments ${tubularSegments} and arc ${arc}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "TorusGeometry",
        radius,
        tube,
        radialSegments,
        tubularSegments,
        arc,
      });
      return output;
    },
  }),
  // TorusKnotGeometry
  new DynamicStructuredTool({
    name: "create-a-torus-knot-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      radius: z.number().describe("radius of the torus knot"),
      tube: z.number().describe("tube of the torus knot"),
      tubularSegments: z.number().describe("tubularSegments of the torus knot"),
      radialSegments: z.number().describe("radialSegments of the torus knot"),
      p: z.number().describe("p of the torus knot"),
      q: z.number().describe("q of the torus knot"),
    }),
    description: `Creates a threejs TorusKnotGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({
      key,
      radius,
      tube,
      tubularSegments,
      radialSegments,
      p,
      q,
    }) => {
      const output = `created a torus knot geometry with key ${key} and radius ${radius} and tube ${tube} and tubularSegments ${tubularSegments} and radialSegments ${radialSegments} and p ${p} and q ${q}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "TorusKnotGeometry",
        radius,
        tube,
        tubularSegments,
        radialSegments,
        p,
        q,
      });
      return output;
    },
  }),
  // RingGeometry
  new DynamicStructuredTool({
    name: "create-a-ring-geometry",
    schema: z.object({
      key: z.string().describe("key to store the geometry in"),
      innerRadius: z.number().describe("innerRadius of the ring"),
      outerRadius: z.number().describe("outerRadius of the ring"),
      thetaSegments: z.number().describe("thetaSegments of the ring"),
      phiSegments: z.number().describe("phiSegments of the ring"),
      thetaStart: z.number().describe("thetaStart of the ring"),
      thetaLength: z.number().describe("thetaLength of the ring"),
    }),
    description: `Creates a threejs RingGeometry with the given parameters and stores it in the GeometriesHash with the given key`,
    func: async ({
      key,
      innerRadius,
      outerRadius,
      thetaSegments,
      phiSegments,
      thetaStart,
      thetaLength,
    }) => {
      const output = `created a ring geometry with key ${key} and innerRadius ${innerRadius} and outerRadius ${outerRadius} and thetaSegments ${thetaSegments} and phiSegments ${phiSegments} and thetaStart ${thetaStart} and thetaLength ${thetaLength}`;
      console.log({ output });
      GeometriesHash.set(key, {
        name: "RingGeometry",
        innerRadius,
        outerRadius,
        thetaSegments,
        phiSegments,
        thetaStart,
        thetaLength,
      });
      return output;
    },
  }),
];
