import { z } from "zod";
import { DynamicStructuredTool } from "langchain/tools";
import { MaterialsHash } from "../../store/three";
import { Color } from "three";

export const materialsTools = [
  // MeshBasicMaterial
  new DynamicStructuredTool({
    name: "create-a-basic-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      color: z.string().describe("color of the material"),
    }),
    description: `Creates a basic material with the given parameters and stores it in the given key`,
    func: async ({ key, color }) => {
      const output = `created a basic material with the key ${key} and the parameters color: ${color}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "MeshBasicMaterial",
        color: new Color(color),
      });
      return output;
    },
  }),
  // MeshDepthMaterial
  new DynamicStructuredTool({
    name: "create-a-depth-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
    }),
    description: `Creates a depth material with the given parameters and stores it in the given key`,
    func: async ({ key }) => {
      const output = `created a depth material with the key ${key}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "MeshDepthMaterial",
      });
      return output;
    },
  }),
  // MeshLambertMaterial
  new DynamicStructuredTool({
    name: "create-a-lambert-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      color: z.string().describe("color of the material"),
      emissive: z.string().optional().describe("emissive of the material"),
      emissiveIntensity: z
        .number()
        .optional()
        .describe("emissiveIntensity of the material"),
      reflectivity: z
        .number()
        .optional()
        .describe("reflectivity of the material"),
      refractionRatio: z
        .number()
        .optional()
        .describe("refractionRatio of the material"),
    }),
    description: `Creates a lambert material with the given parameters and stores it in the given key`,
    func: async ({
      key,
      color,
      emissive,
      emissiveIntensity,
      reflectivity,
      refractionRatio,
    }) => {
      const output = `created a lambert material with the key ${key} and the parameters color: ${color}, emissive: ${emissive}, emissiveIntensity: ${emissiveIntensity}, reflectivity: ${reflectivity}, refractionRatio: ${refractionRatio}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "MeshLambertMaterial",
        color: new Color(color),
        emissive: emissive ? new Color(emissive) : undefined,
        emissiveIntensity,
        reflectivity,
        refractionRatio,
      });
      return output;
    },
  }),
  // MeshMatcapMaterial
  new DynamicStructuredTool({
    name: "create-a-matcap-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      color: z.string().describe("color of the material"),
    }),
    description: `Creates a matcap material with the given parameters and stores it in the given key`,
    func: async ({ key, color }) => {
      const output = `created a matcap material with the key ${key} and the parameters color: ${color}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "MeshMatcapMaterial",
        color: new Color(color),
      });
      return output;
    },
  }),
  // MeshNormalMaterial
  new DynamicStructuredTool({
    name: "create-a-normal-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
    }),
    description: `Creates a normal material with the given parameters and stores it in the given key`,
    func: async ({ key }) => {
      const output = `created a normal material with the key ${key}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "MeshNormalMaterial",
      });
      return output;
    },
  }),
  // MeshPhysicalMaterial
  new DynamicStructuredTool({
    name: "create-a-physical-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      color: z.string().describe("color of the material"),
      emissive: z.string().optional().describe("emissive of the material"),
      emissiveIntensity: z
        .number()
        .optional()
        .describe("emissiveIntensity of the material"),
      reflectivity: z
        .number()
        .optional()
        .describe("reflectivity of the material"),
      opacity: z.number().optional().describe("opacity of the material"),
      transparent: z
        .boolean()
        .optional()
        .describe("transparent of the material"),
      clearcoat: z.number().optional().describe("clearcoat of the material"),
      clearcoatRoughness: z
        .number()
        .optional()
        .describe("clearcoatRoughness of the material"),
      sheen: z.number().optional().describe("sheen of the material"),
      sheenColor: z.string().optional().describe("sheenColor of the material"),
      sheenRoughness: z
        .number()
        .optional()
        .describe("sheenRoughness of the material"),
      thickness: z.number().optional().describe("thickness of the material"),
    }),
    description: `Creates a physical material with the given parameters and stores it in the given key`,
    func: async ({
      key,
      color,
      emissive,
      emissiveIntensity,
      reflectivity,
      opacity,
      transparent,
      sheen,
      sheenColor,
      sheenRoughness,
      thickness,
    }) => {
      const output = `created a physical material with the key ${key} and the parameters
      color: ${color},
      emissive: ${emissive},
      emissiveIntensity: ${emissiveIntensity},
      reflectivity: ${reflectivity},
      opacity: ${opacity},
      transparent: ${transparent},
      sheen: ${sheen},
      sheenColor: ${sheenColor},
      sheenRoughness: ${sheenRoughness},
      thickness: ${thickness}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "MeshPhysicalMaterial",
        color: new Color(color),
        emissive: emissive ? new Color(emissive) : undefined,
        emissiveIntensity,
        reflectivity,
        opacity,
        transparent,
        sheen,
        sheenColor: sheenColor ? new Color(sheenColor) : undefined,
        sheenRoughness,
        thickness,
      });
      return output;
    },
  }),
  // MeshStandardMaterial
  new DynamicStructuredTool({
    name: "create-a-standard-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      color: z.string().describe("color of the material"),
      emissive: z.string().optional().describe("emissive of the material"),
      emissiveIntensity: z
        .number()
        .optional()
        .describe("emissiveIntensity of the material"),
      opacity: z.number().optional().describe("opacity of the material"),
      transparent: z
        .boolean()
        .optional()
        .describe("transparent of the material"),
      clearcoat: z.number().optional().describe("clearcoat of the material"),
      clearcoatRoughness: z
        .number()
        .optional()
        .describe("clearcoatRoughness of the material"),
      envMapIntensity: z
        .number()
        .optional()
        .describe("envMapIntensity of the material"),
      roughness: z.number().optional().describe("roughness of the material"),
      metalness: z.number().optional().describe("metalness of the material"),
    }),
    description: `Creates a standard material with the given parameters and stores it in the given key`,
    func: async ({
      key,
      color,
      emissive,
      emissiveIntensity,
      opacity,
      transparent,
      envMapIntensity,
      roughness,
      metalness,
    }) => {
      const output = `created a standard material with the key ${key} and the parameters
        color: ${color},
        emissive: ${emissive},
        emissiveIntensity: ${emissiveIntensity},
        opacity: ${opacity},
        transparent: ${transparent},
        envMapIntensity:${envMapIntensity},
        roughness: ${roughness},
        metalness: ${metalness}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "MeshStandardMaterial",
        color: new Color(color),
        emissive: emissive ? new Color(emissive) : undefined,
        emissiveIntensity,
        opacity,
        transparent,
        envMapIntensity,
        roughness,
        metalness,
      });
      return output;
    },
  }),
  // MeshToonMaterial
  new DynamicStructuredTool({
    name: "create-a-toon-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      color: z.string().describe("color of the material"),
      emissive: z.string().optional().describe("emissive of the material"),
      emissiveIntensity: z
        .number()
        .optional()
        .describe("emissiveIntensity of the material"),
      opacity: z.number().optional().describe("opacity of the material"),
      transparent: z
        .boolean()
        .optional()
        .describe("transparent of the material"),
    }),
    description: `Creates a toon material with the given parameters and stores it in the given key`,
    func: async ({
      key,
      color,
      emissive,
      emissiveIntensity,
      opacity,
      transparent,
    }) => {
      const output = `created a toon material with the key ${key} and the parameters
      color: ${color},
      emissive: ${emissive},
      emissiveIntensity: ${emissiveIntensity},
      opacity: ${opacity},
      transparent: ${transparent}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "MeshToonMaterial",
        color: new Color(color),
        emissive: emissive ? new Color(emissive) : undefined,
        emissiveIntensity,
        opacity,
        transparent,
      });
      return output;
    },
  }),
  // PointsMaterial
  new DynamicStructuredTool({
    name: "create-a-points-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      color: z.string().describe("color of the material"),
      size: z.number().optional().describe("size of the material"),
      sizeAttenuation: z
        .boolean()
        .optional()
        .describe("sizeAttenuation of the material"),
      opacity: z.number().optional().describe("opacity of the material"),
      transparent: z
        .boolean()
        .optional()
        .describe("transparent of the material"),
    }),
    description: `Creates a points material with the given parameters and stores it in the given key`,
    func: async ({
      key,
      color,
      size,
      sizeAttenuation,
      opacity,
      transparent,
    }) => {
      const output = `created a points material with the key ${key} and the parameters
      color: ${color},
      size: ${size},
      sizeAttenuation: ${sizeAttenuation},
      opacity: ${opacity},
      transparent: ${transparent}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "PointsMaterial",
        color: new Color(color),
        size,
        sizeAttenuation,
        opacity,
        transparent,
      });
      return output;
    },
  }),
  // ShadowMaterial
  new DynamicStructuredTool({
    name: "create-a-shadow-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      opacity: z.number().optional().describe("opacity of the material"),
      transparent: z
        .boolean()
        .optional()
        .describe("transparent of the material"),
    }),
    description: `Creates a shadow material with the given parameters and stores it in the given key`,
    func: async ({ key, opacity, transparent }) => {
      const output = `created a shadow material with the key ${key} and the parameters
      opacity: ${opacity},
      transparent: ${transparent}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "ShadowMaterial",
        opacity,
        transparent,
      });
      return output;
    },
  }),
  // SpriteMaterial
  new DynamicStructuredTool({
    name: "create-a-sprite-material",
    schema: z.object({
      key: z.string().describe("key to store the material in"),
      color: z.string().describe("color of the material"),
      opacity: z.number().optional().describe("opacity of the material"),
      transparent: z
        .boolean()
        .optional()
        .describe("transparent of the material"),
    }),
    description: `Creates a sprite material with the given parameters and stores it in the given key`,
    func: async ({ key, color, opacity, transparent }) => {
      const output = `created a sprite material with the key ${key} and the parameters
      color: ${color},
      opacity: ${opacity},
      transparent: ${transparent}`;
      console.log({ output });
      MaterialsHash.set(key, {
        name: "SpriteMaterial",
        color: new Color(color),
        opacity,
        transparent,
      });
      return output;
    },
  }),
];
