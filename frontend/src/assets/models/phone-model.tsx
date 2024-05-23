import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { GroupProps } from "@react-three/fiber";
import { useEffect } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube_4: THREE.Mesh;
    Cube_5: THREE.Mesh;
    Cube_6: THREE.Mesh;
    Cube_7: THREE.Mesh;
    Cube_8: THREE.Mesh;
    Cube_9: THREE.Mesh;
  };
  materials: {
    PhoneBody: THREE.MeshStandardMaterial;
    Glass: THREE.MeshPhysicalMaterial;
    MetalMaterial: THREE.MeshStandardMaterial;
    Black: THREE.MeshStandardMaterial;
    ScreenFrame: THREE.MeshStandardMaterial;
    TextMetal: THREE.MeshStandardMaterial;
    ["Matrix.001"]: THREE.MeshStandardMaterial;
    FrameMetal: THREE.MeshStandardMaterial;
    MatFrame: THREE.MeshStandardMaterial;
    ["Screen.001"]: THREE.MeshStandardMaterial;
  };
};

interface PhoneModelProps extends GroupProps {
  screenshot?: THREE.Texture;
}

export function PhoneModel({ screenshot, ...props }: PhoneModelProps) {
  const { nodes, materials } = useGLTF("/models/untitled.glb") as GLTFResult;

  useEffect(() => {
    if (!screenshot) return;

    screenshot.flipY = false;
    screenshot.colorSpace = THREE.SRGBColorSpace;
  }, [screenshot]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[0, 0, 0]} scale={[1.837, 5, 1.773]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.PhoneBody}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials.MetalMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_3.geometry}
          material={materials.Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4.geometry}
          material={materials.ScreenFrame}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_5.geometry}
          material={materials.TextMetal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_6.geometry}
          material={materials["Matrix.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_7.geometry}
          material={materials.FrameMetal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_8.geometry}
          material={materials.MatFrame}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_9.geometry}
          material={materials["Screen.001"]}
        >
          <meshPhongMaterial
            emissive={0xffffff}
            emissiveMap={screenshot}
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/untitled.glb");
