import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { toRadians3 } from "src/utils/helpers/to-radians3/to-radians3";
import { Mesh } from "three/src/objects/Mesh.js";
import { MeshStandardMaterial } from "three/src/materials/MeshStandardMaterial.js";

type GLTFResult = GLTF & {
  nodes: {
    Button001: Mesh;
    Cube002_1: Mesh;
    Cube002_2: Mesh;
    Cube013_1: Mesh;
    Cube013_2: Mesh;
    Cylinder004: Mesh;
    Cylinder004_1: Mesh;
    Text001: Mesh;
    Text002: Mesh;
    History: Mesh;
    History1Button: Mesh;
    Button: Mesh;
    Cube010: Mesh;
    Cube011: Mesh;
    Text015: Mesh;
    Text016: Mesh;
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
    History3Button001: Mesh;
    Button004: Mesh;
    Cube003: Mesh;
    Cube004: Mesh;
    Text006: Mesh;
    Text007: Mesh;
    LiamText: Mesh;
    Cube005: Mesh;
    Cube006: Mesh;
    Text012: Mesh;
    NoahText: Mesh;
    Cube001: Mesh;
    Cube002: Mesh;
    Text008: Mesh;
    OliviaButton: Mesh;
    OliviaButton001: Mesh;
    Plane001: Mesh;
    Text: Mesh;
    Text003: Mesh;
    OliviaButton002: Mesh;
    OliviaButton003: Mesh;
    Plane002: Mesh;
    Text004: Mesh;
    Text005: Mesh;
    Phone001: Mesh;
    Segment1: Mesh;
    Segment2: Mesh;
    Summary: Mesh;
  };
  materials: {
    Blue: MeshStandardMaterial;
    white: MeshStandardMaterial;
    Gray: MeshStandardMaterial;
    RedGradient: MeshStandardMaterial;
    Text: MeshStandardMaterial;
    GreenButton: MeshStandardMaterial;
    background: MeshStandardMaterial;
    OragneSegment: MeshStandardMaterial;
    RedSegemnt: MeshStandardMaterial;
  };
};

export function Front2Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/front2.glb") as GLTFResult;
  return (
    <group rotation={[...toRadians3(180, 0, -90)]}>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button001.geometry}
          material={materials.Blue}
          position={[0.259, -2.262, -1.02]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.084, 0.025, 0.084]}
        />
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
        <group position={[0.026, -1.712, -0.02]} scale={[0.726, 1, 1.411]}>
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
          position={[0.163, 1.553, -0.049]}
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
            material={materials.RedGradient}
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
          geometry={nodes.History.geometry}
          material={materials.Text}
          position={[0.115, -1.045, 1.159]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.903, 0.655, 0.903]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.History1Button.geometry}
          material={materials.Gray}
          position={[0.095, -1.419, -0.015]}
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
          geometry={nodes.History2Button.geometry}
          material={materials.Gray}
          position={[0.095, -1.841, -0.015]}
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
          position={[0.095, -2.25, -0.015]}
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.History3Button001.geometry}
          material={materials.Gray}
          position={[0.095, -2.697, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Button004.geometry}
            material={materials.Blue}
            position={[0.065, 0.493, -3.023]}
            scale={[0.251, 0.076, 0.251]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube003.geometry}
              material={materials.white}
              position={[0.092, 0.999, -0.262]}
              rotation={[0, -Math.PI / 4, Math.PI / 2]}
              scale={[0.341, 0.422, 0.06]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube004.geometry}
              material={materials.white}
              position={[0.091, 0.992, 0.251]}
              rotation={[0, Math.PI / 4, Math.PI / 2]}
              scale={[0.341, 0.422, 0.06]}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text006.geometry}
            material={materials.Text}
            position={[0.211, 0.579, -2.011]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.473}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text007.geometry}
            material={materials.Text}
            position={[0.214, 0.579, 3.261]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.56}
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
          geometry={nodes.OliviaButton.geometry}
          material={materials.Gray}
          position={[0.095, 0.373, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.OliviaButton001.geometry}
            material={materials.Text}
            position={[0.229, 0.472, -0.705]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.444}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001.geometry}
            material={materials.GreenButton}
            position={[0.071, 0.614, -2.739]}
            scale={3.005}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text.geometry}
            material={materials.white}
            position={[0.183, 0.62, -2.452]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.41}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text003.geometry}
            material={materials.Text}
            position={[0.25, 0.587, 2.14]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.57}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.OliviaButton002.geometry}
          material={materials.Gray}
          position={[0.095, -0.064, -0.015]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.333}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.OliviaButton003.geometry}
            material={materials.Text}
            position={[0.229, 0.472, -0.705]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.444}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane002.geometry}
            material={materials.GreenButton}
            position={[0.071, 0.614, -2.739]}
            scale={3.005}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text004.geometry}
            material={materials.Text}
            position={[0.25, 0.577, 2.532]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.57}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text005.geometry}
            material={materials.white}
            position={[0.183, 0.62, -2.452]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.41}
          />
        </mesh>
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
          geometry={nodes.Segment1.geometry}
          material={materials.OragneSegment}
          position={[0.063, 1.556, -0.045]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={39.034}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Segment2.geometry}
          material={materials.RedSegemnt}
          position={[0.063, 1.556, -0.045]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={39.034}
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
      </group>
    </group>
  );
}

useGLTF.preload("/models/front2.glb");
