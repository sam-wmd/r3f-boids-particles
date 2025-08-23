import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { followGoal, lerpToGoal } from "../utils/vectorUtils";

export default function Boid({
  leader = false,
  goalPosition = [0, 0, 0],
  onPositionUpdate,
}) {
  const meshRef = useRef();
  const [currentPosition, setCurrentPosition] = useState([0, 0, 0]);
  useEffect(() => {
    if (onPositionUpdate != undefined) onPositionUpdate(currentPosition);
  }, currentPosition);
  useFrame((state, delta) => {
    setCurrentPosition(
      leader
        ? lerpToGoal(currentPosition, goalPosition)
        : followGoal(currentPosition, goalPosition, delta)
    );

    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });

  return (
    <>
      <mesh ref={meshRef} rotation={[0, 2, 0]} position={currentPosition}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshPhongMaterial color={leader ? "yellow" : "blue"} />
      </mesh>
    </>
  );
}
