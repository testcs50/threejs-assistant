import { useEffect, useRef, useState } from "react";
import "./App.css";
import { runner } from "./assistant/runner";
import { Canvas } from "@react-three/fiber";
import {
  GeometriesHash,
  MaterialsHash,
  MeshesHash,
  geometriesMap,
  materialsMap,
  useThreeStore,
} from "./store/three";
import { BufferGeometry, Group, Material, Mesh } from "three";
import { OrbitControls } from "@react-three/drei";
import "./App.css";

const Materials = new Map<string, Material>();
const Geometries = new Map<string, BufferGeometry>();

function App() {
  const { count } = useThreeStore((state) => state);
  const [message, setMessage] = useState("");
  const groupRef = useRef<Group>(null);

  const messageHandler = () => {
    runner(message);
  };

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof Mesh) {
          child.geometry.dispose();
          for (const key in child.material) {
            const value = child.material[key];
            if (value && typeof value.dispose === "function") {
              value.dispose();
            }
          }
        }
      });
      groupRef.current.clear();
    }
    Materials.clear();
    Geometries.clear();

    MaterialsHash.forEach((mat, key) => {
      const material = new materialsMap[mat.name]();
      for (const k in mat) {
        // @ts-ignore
        if (k !== "name" && mat[k] !== undefined) {
          // @ts-ignore
          material[k] = mat[k];
        }
      }
      Materials.set(key, material);
    });

    GeometriesHash.forEach((geom, key) => {
      const arg: any[] = [];
      for (const k in geom) {
        if (k !== "name") {
          // @ts-ignore
          arg.push(geom[k]);
        }
      }
      const geometry = new geometriesMap[geom.name](...arg);
      Geometries.set(key, geometry);
    });

    Array.from(MeshesHash.entries()).forEach(([_, m]) => {
      const geometry = Geometries.get(m.geometry);
      const material = Materials.get(m.material);
      if (geometry && material) {
        const mesh = new Mesh(geometry, material);
        if (m.rotationX) mesh.rotation.x = m.rotationX;
        if (m.rotationY) mesh.rotation.y = m.rotationY;
        if (m.rotationZ) mesh.rotation.z = m.rotationZ;
        if (m.x) mesh.position.x = m.x;
        if (m.y) mesh.position.y = m.y;
        if (m.z) mesh.position.z = m.z;
        if (m.scaleX) mesh.scale.x = m.scaleX;
        if (m.scaleY) mesh.scale.y = m.scaleY;
        if (m.scaleZ) mesh.scale.z = m.scaleZ;

        groupRef.current?.add(mesh);
      }
    });
  }, [count]);

  return (
    <div className="container">
      <div className="form">
        <input
          className="message"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="button" onClick={messageHandler}>
          Submit
        </button>
      </div>
      <Canvas flat>
        <color attach="background" args={["black"]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls makeDefault />
        <group position={[0, 0, 0]} ref={groupRef} />
        {/* <mesh>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="red" />
        </mesh> */}
      </Canvas>
    </div>
  );
}

export default App;
