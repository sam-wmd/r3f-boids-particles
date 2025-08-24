import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { followGoal, lerpToGoal } from "../utils/vectorUtils";
import { observer } from "mobx-react-lite";
import { store } from "../store";

const BoidView = observer(({ boidId }) => {
  const meshRef = useRef();
  const boid = store.getbyId(boidId);
  useFrame((state, delta) => {
    boid.updatePosition(
      boid.isLeader
        ? lerpToGoal(boid.position, boid.goalPosition)
        : followGoal(boid.position, boid.goalPosition, delta)
    );
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <mesh ref={meshRef} rotation={[0, 2, 0]} position={boid.position}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshPhongMaterial color={boid.isLeader ? "yellow" : "blue"} />
      </mesh>
    </>
  );
});

export default BoidView;
