import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useRef, useState } from "react";
import { followGoal, lerpToGoal } from "../utils/vectorUtils";
import { observer } from "mobx-react-lite";
import { Boid } from "model/Boid";
import { Mesh } from "three";
import { store } from "../store";

type Props = {
  boidId: string;
};
const BoidView = observer(({ boidId }: Props) => {
  const meshRef: RefObject<Mesh | null> = useRef(null);
  const boid: Boid | undefined = store.getbyId(boidId);
  useFrame((state, delta) => {
    if (boid == undefined) {
      console.error(`boid not found with id ${boidId}`);
      return;
    }
    if (boid.goalPosition != undefined) {
      if (boid.isLeader) {
        boid.updatePosition(lerpToGoal(boid.position, boid.goalPosition));
      } else {
        boid.updatePosition(
          followGoal(boid.position, boid.goalPosition, delta)
        );
      }
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });
  return (
    <>
      {boid && (
        <mesh ref={meshRef} rotation={[0, 2, 0]} position={boid.position}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshPhongMaterial color={boid.isLeader ? "yellow" : "blue"} />
        </mesh>
      )}
    </>
  );
});

export default BoidView;
