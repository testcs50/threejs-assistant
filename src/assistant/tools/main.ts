import { z } from "zod";
import { DynamicStructuredTool } from "langchain/tools";
import {
  GeometriesHash,
  MaterialsHash,
  MeshesHash,
  incrementCount,
} from "../../store/three";
import { geometriesTools } from "./geometries";
import { materialsTools } from "./materials";
import { meshesTools } from "./meshes";

export const tools = [
  new DynamicStructuredTool({
    name: "setup",
    schema: z.object({}),
    description: `Sets up the scene (it is necessary to run this before anything else)`,
    func: async () => {
      const output = `setup the scene`;
      console.log({ output });
      MaterialsHash.clear();
      GeometriesHash.clear();
      MeshesHash.clear();
      return output;
    },
  }),
  ...geometriesTools,
  ...materialsTools,
  ...meshesTools,
  new DynamicStructuredTool({
    name: "finish",
    schema: z.object({}),
    description: `Finishes the scene (it is necessary to run this after everything else)`,
    func: async () => {
      const output = `finished the scene`;
      console.log({ output });
      incrementCount();
      return output;
    },
  }),
];
