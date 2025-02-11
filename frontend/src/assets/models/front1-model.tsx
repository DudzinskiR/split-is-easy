import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Mesh } from "three/src/objects/Mesh.js";
import { MeshStandardMaterial } from "three/src/materials/MeshStandardMaterial.js";
import { toRadians3 } from "src/utils/helpers/toRadians3/toRadians3";

type GLTFResult = GLTF & {
  nodes: {
    OliviaButton: Mesh;
    Plane: Mesh;
    Text003: Mesh;
    LiamButton: Mesh;
    Text005: Mesh;
    Text006: Mesh;
    NoahText: Mesh;
    Cube001: Mesh;
    Cube002: Mesh;
    Text008: Mesh;
    OliviaText: Mesh;
    Cube003: Mesh;
    Cube004: Mesh;
    Text010: Mesh;
    LiamText: Mesh;
    Cube005: Mesh;
    Cube006: Mesh;
    Text012: Mesh;
    JamesText: Mesh;
    Cube007: Mesh;
    Cube008: Mesh;
    Text014: Mesh;
    JamesButton: Mesh;
    Text004: Mesh;
    Text007: Mesh;
    NoahButton: Mesh;
    Text009: Mesh;
    Text011: Mesh;
    History1Button: Mesh;
    Button: Mesh;
    Cube010: Mesh;
    Cube011: Mesh;
    Text015: Mesh;
    Text016: Mesh;
    Button001: Mesh;
    History2Button: Mesh;
    Button002: Mesh;
    Cube012: Mesh;
    Cube013: Mesh;
    Text019: Mesh;
    Text020: Mesh;
    History3Button: Mesh;
    Button003: Mesh;
    Cube014: Mesh;
    Cube015: Mesh;
    Text021: Mesh;
    Text022: Mesh;
    Cube002_1: Mesh;
    Cube002_2: Mesh;
    Cube013_1: Mesh;
    Cube013_2: Mesh;
    Cylinder004: Mesh;
    Cylinder004_1: Mesh;
    Text001: Mesh;
    Text002: Mesh;
    Phone001: Mesh;
    segment1: Mesh;
    segment2: Mesh;
    segment3: Mesh;
    segment4: Mesh;
    Summary: Mesh;
    History: Mesh;
  };
  materials: {
    Text: MeshStandardMaterial;
    Gray: MeshStandardMaterial;
    Blue: MeshStandardMaterial;
    white: MeshStandardMaterial;
    GreenGradient: MeshStandardMaterial;
    background: MeshStandardMaterial;
    segmentOragne: MeshStandardMaterial;
    SegmentYellow: MeshStandardMaterial;
    SegmentBlue: MeshStandardMaterial;
    SegmentGreen: MeshStandardMaterial;
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
