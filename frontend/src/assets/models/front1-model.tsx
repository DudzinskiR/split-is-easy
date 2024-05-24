import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { toRadians3 } from "src/utils/helpers";

type GLTFResult = GLTF & {
  nodes: {
    OliviaButton: THREE.Mesh;
    Plane: THREE.Mesh;
    Text003: THREE.Mesh;
    LiamButton: THREE.Mesh;
    Text005: THREE.Mesh;
    Text006: THREE.Mesh;
    NoahText: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
    Text008: THREE.Mesh;
    OliviaText: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube004: THREE.Mesh;
    Text010: THREE.Mesh;
    LiamText: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube006: THREE.Mesh;
    Text012: THREE.Mesh;
    JamesText: THREE.Mesh;
    Cube007: THREE.Mesh;
    Cube008: THREE.Mesh;
    Text014: THREE.Mesh;
    JamesButton: THREE.Mesh;
    Text004: THREE.Mesh;
    Text007: THREE.Mesh;
    NoahButton: THREE.Mesh;
    Text009: THREE.Mesh;
    Text011: THREE.Mesh;
    History1Button: THREE.Mesh;
    Button: THREE.Mesh;
    Cube010: THREE.Mesh;
    Cube011: THREE.Mesh;
    Text015: THREE.Mesh;
    Text016: THREE.Mesh;
    Button001: THREE.Mesh;
    History2Button: THREE.Mesh;
    Button002: THREE.Mesh;
    Cube012: THREE.Mesh;
    Cube013: THREE.Mesh;
    Text019: THREE.Mesh;
    Text020: THREE.Mesh;
    History3Button: THREE.Mesh;
    Button003: THREE.Mesh;
    Cube014: THREE.Mesh;
    Cube015: THREE.Mesh;
    Text021: THREE.Mesh;
    Text022: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
    Cube013_1: THREE.Mesh;
    Cube013_2: THREE.Mesh;
    Cylinder004: THREE.Mesh;
    Cylinder004_1: THREE.Mesh;
    Text001: THREE.Mesh;
    Text002: THREE.Mesh;
    Phone001: THREE.Mesh;
    segment1: THREE.Mesh;
    segment2: THREE.Mesh;
    segment3: THREE.Mesh;
    segment4: THREE.Mesh;
    Summary: THREE.Mesh;
    History: THREE.Mesh;
  };
  materials: {
    Text: THREE.MeshStandardMaterial;
    Gray: THREE.MeshStandardMaterial;
    Blue: THREE.MeshStandardMaterial;
    white: THREE.MeshStandardMaterial;
    GreenGradient: THREE.MeshStandardMaterial;
    background: THREE.MeshStandardMaterial;
    segmentOragne: THREE.MeshStandardMaterial;
    SegmentYellow: THREE.MeshStandardMaterial;
    SegmentBlue: THREE.MeshStandardMaterial;
    SegmentGreen: THREE.MeshStandardMaterial;
  };
};

export function Front1Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/front1.glb") as GLTFResult;
  return (
    <group rotation={[...toRadians3(180, 0, -90)]}>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.OliviaButton.geometry}
          material={materials.Text}
          position={[0.288, 0.283, -0.796]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.232}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={materials.Gray}
            position={[-3.364, -0.829, -0.388]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={1.432}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text003.geometry}
            material={materials.Text}
            position={[-6.88, 0, 0]}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LiamButton.geometry}
          material={materials.Gray}
          position={[0.095, -0.043, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text005.geometry}
            material={materials.Text}
            position={[0.271, 0.579, 2.455]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.698}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text006.geometry}
            material={materials.Text}
            position={[0.271, 0.579, -2.349]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.698}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NoahText.geometry}
          material={materials.Text}
          position={[0.136, 2.411, 0.789]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.187}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={nodes.Cube001.material}
            position={[0.062, -0.146, 0.198]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            scale={[0.047, 0.058, 1.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={nodes.Cube002.material}
            position={[2.113, -0.143, 0.98]}
            rotation={[Math.PI, -0.841, -Math.PI / 2]}
            scale={[0.047, 0.058, 1.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text008.geometry}
            material={materials.Text}
            position={[0, 0.086, 0.822]}
            scale={0.708}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.OliviaText.geometry}
          material={materials.Text}
          position={[0.146, 2.368, -0.919]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.187}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={nodes.Cube003.material}
            position={[0.062, -0.146, 0.198]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            scale={[0.047, 0.058, 1.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004.geometry}
            material={nodes.Cube004.material}
            position={[-1.892, -0.143, 1.079]}
            rotation={[0, -0.729, Math.PI / 2]}
            scale={[0.047, 0.058, 1.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text010.geometry}
            material={materials.Text}
            position={[0, 0.086, 0.822]}
            scale={0.708}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LiamText.geometry}
          material={materials.Text}
          position={[0.136, 0.843, -0.9]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.187}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={nodes.Cube005.material}
            position={[0.062, -0.146, 0.198]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            scale={[0.047, 0.058, 1.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube006.geometry}
            material={nodes.Cube006.material}
            position={[-1.991, -0.143, -0.595]}
            rotation={[Math.PI, -0.841, -Math.PI / 2]}
            scale={[0.047, 0.058, 1.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text012.geometry}
            material={materials.Text}
            position={[0, 0.086, 0.822]}
            scale={0.708}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.JamesText.geometry}
          material={materials.Text}
          position={[0.149, 1.334, 1.057]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.187}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube007.geometry}
            material={nodes.Cube007.material}
            position={[0.062, -0.146, 0.198]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            scale={[0.047, 0.058, 1.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube008.geometry}
            material={nodes.Cube008.material}
            position={[2.295, -0.143, -0.256]}
            rotation={[-Math.PI, 1.153, -Math.PI / 2]}
            scale={[0.047, 0.058, 1.199]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text014.geometry}
            material={materials.Text}
            position={[0, 0.086, 0.822]}
            scale={0.708}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.JamesButton.geometry}
          material={materials.Gray}
          position={[0.095, -0.467, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text004.geometry}
            material={materials.Text}
            position={[0.271, 0.579, 2.455]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.698}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text007.geometry}
            material={materials.Text}
            position={[0.271, 0.579, -2.349]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.698}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NoahButton.geometry}
          material={materials.Gray}
          position={[0.095, -0.904, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text009.geometry}
            material={materials.Text}
            position={[0.271, 0.579, 2.455]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.698}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text011.geometry}
            material={materials.Text}
            position={[0.271, 0.579, -2.349]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.698}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.History1Button.geometry}
          material={materials.Gray}
          position={[0.095, -2.24, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Button.geometry}
            material={materials.Blue}
            position={[0.065, 0.493, -3.023]}
            scale={[0.251, 0.076, 0.251]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube010.geometry}
              material={materials.white}
              position={[0.091, 0.992, 0.251]}
              rotation={[0, Math.PI / 4, Math.PI / 2]}
              scale={[0.341, 0.422, 0.06]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube011.geometry}
              material={materials.white}
              position={[0.092, 0.999, -0.262]}
              rotation={[0, -Math.PI / 4, Math.PI / 2]}
              scale={[0.341, 0.422, 0.06]}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text015.geometry}
            material={materials.Text}
            position={[0.214, 0.579, 3.261]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.56}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text016.geometry}
            material={materials.Text}
            position={[0.211, 0.579, -2.011]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.473}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button001.geometry}
          material={materials.Blue}
          position={[0.259, -2.262, -1.02]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.084, 0.025, 0.084]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.History2Button.geometry}
          material={materials.Gray}
          position={[0.095, -2.662, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Button002.geometry}
            material={materials.Blue}
            position={[0.065, 0.493, -3.023]}
            scale={[0.251, 0.076, 0.251]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube012.geometry}
              material={materials.white}
              position={[0.091, 0.992, 0.251]}
              rotation={[0, Math.PI / 4, Math.PI / 2]}
              scale={[0.341, 0.422, 0.06]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube013.geometry}
              material={materials.white}
              position={[0.092, 0.999, -0.262]}
              rotation={[0, -Math.PI / 4, Math.PI / 2]}
              scale={[0.341, 0.422, 0.06]}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text019.geometry}
            material={materials.Text}
            position={[0.214, 0.579, 3.261]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.56}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text020.geometry}
            material={materials.Text}
            position={[0.211, 0.579, -2.011]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.473}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.History3Button.geometry}
          material={materials.Gray}
          position={[0.095, -3.071, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Button003.geometry}
            material={materials.Blue}
            position={[0.065, 0.493, -3.023]}
            scale={[0.251, 0.076, 0.251]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube014.geometry}
              material={materials.white}
              position={[0.091, 0.992, 0.251]}
              rotation={[0, Math.PI / 4, Math.PI / 2]}
              scale={[0.341, 0.422, 0.06]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube015.geometry}
              material={materials.white}
              position={[0.092, 0.999, -0.262]}
              rotation={[0, -Math.PI / 4, Math.PI / 2]}
              scale={[0.341, 0.422, 0.06]}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text021.geometry}
            material={materials.Text}
            position={[0.214, 0.579, 3.261]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.56}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text022.geometry}
            material={materials.Text}
            position={[0.211, 0.579, -2.011]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.473}
          />
        </mesh>
        <group position={[0.026, 2.25, -0.02]} scale={[0.726, 1, 1.411]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials.white}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_2.geometry}
            material={materials.Gray}
          />
        </group>
        <group position={[0.026, -2.532, -0.02]} scale={[0.726, 1, 1.411]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube013_1.geometry}
            material={materials.white}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube013_2.geometry}
            material={materials.Gray}
          />
        </group>
        <group
          position={[0.144, 1.553, -0.049]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.554, 0.402, 0.554]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004.geometry}
            material={materials.white}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_1.geometry}
            material={materials.GreenGradient}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text001.geometry}
            material={materials.white}
            position={[-0.181, 0.919, -0.001]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.296}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text002.geometry}
            material={materials.white}
            position={[0.426, 0.958, 0.004]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.296}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Phone001.geometry}
          material={materials.background}
          rotation={[0, 0, Math.PI / 2]}
          scale={[1.837, 5, 1.773]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.segment1.geometry}
          material={materials.segmentOragne}
          position={[0.087, 1.549, -0.049]}
          rotation={[1.573, 0, -Math.PI / 2]}
          scale={[22.351, 16.222, 22.351]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.segment2.geometry}
          material={materials.SegmentYellow}
          position={[0.087, 1.549, -0.049]}
          rotation={[1.573, 0, -Math.PI / 2]}
          scale={[22.351, 16.222, 22.351]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.segment3.geometry}
          material={materials.SegmentBlue}
          position={[0.087, 1.549, -0.049]}
          rotation={[1.573, 0, -Math.PI / 2]}
          scale={[22.351, 16.222, 22.351]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.segment4.geometry}
          material={materials.SegmentGreen}
          position={[0.087, 1.549, -0.049]}
          rotation={[1.573, 0, -Math.PI / 2]}
          scale={[22.351, 16.222, 22.351]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Summary.geometry}
          material={materials.Text}
          position={[0.122, 2.923, 1.23]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.903, 0.655, 0.903]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.History.geometry}
          material={materials.Text}
          position={[0.115, -1.865, 1.159]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.903, 0.655, 0.903]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/front1.glb");
