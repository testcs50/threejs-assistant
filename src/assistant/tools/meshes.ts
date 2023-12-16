import { z } from "zod";
import { DynamicStructuredTool } from "langchain/tools";
import { MeshesHash } from "../../store/three";

export const meshesTools = [
  new DynamicStructuredTool({
    name: "create-a-mesh",
    schema: z.object({
      key: z.string().describe("key to store the mesh in"),
      material: z.string().describe("key of the material to use"),
      geometry: z.string().describe("key of the geometry to use"),
      x: z.number().optional().describe("the x coordinate of the mesh"),
      y: z.number().optional().describe("the y coordinate of the mesh"),
      z: z.number().optional().describe("the z coordinate of the mesh"),
      rotationX: z.number().optional().describe("the x rotation of the mesh"),
      rotationY: z.number().optional().describe("the y rotation of the mesh"),
      rotationZ: z.number().optional().describe("the z rotation of the mesh"),
      scaleX: z.number().optional().describe("the x scale of the mesh"),
      scaleY: z.number().optional().describe("the y scale of the mesh"),
      scaleZ: z.number().optional().describe("the z scale of the mesh"),
      castShadow: z.boolean().optional().describe("whether to cast shadow"),
      receiveShadow: z
        .boolean()
        .optional()
        .describe("whether to receive shadow"),
    }),
    description: `Creates a threejs Mesh with given material, geometry and position and rotation and scale and stores it in the store`,
    func: async ({
      material,
      geometry,
      x,
      y,
      z,
      key,
      rotationX,
      rotationY,
      rotationZ,
      scaleX,
      scaleY,
      scaleZ,
      castShadow,
      receiveShadow,
    }) => {
      const output = `created a mesh with material ${material} and geometry ${geometry} and position ${x} ${y} ${z} and rotation ${rotationX} ${rotationY} ${rotationZ} and scale ${scaleX} ${scaleY} ${scaleZ} and castShadow ${castShadow} and receiveShadow ${receiveShadow}`;
      console.log({ output });
      MeshesHash.set(key, {
        material,
        geometry,
        x,
        y,
        z,
        rotationX,
        rotationY,
        rotationZ,
        scaleX,
        scaleY,
        scaleZ,
      });
      return output;
    },
  }),
];
