import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useRef, useState } from "react";
import { distance, lerpToGoal, vectorLength } from "../utils/vectorUtils";
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
    // if (meshRef.current) {
    //   meshRef.current.rotation.x += delta;
    //   meshRef.current.rotation.y += delta;
    // }

    if (boid != undefined) {
      boid.avoidEdges();
      boid.avoidNeighbors(delta);
      boid.alignment();
      boid.move();
    }
  });
  return (
    <>
      {boid && (
        <mesh ref={meshRef} position={[boid.position[0], boid.position[1], 0]}>
          <circleGeometry args={[0.05, 1]} />
          <meshBasicMaterial color={boid.isLeader ? "yellow" : "blue"} />
        </mesh>
      )}
    </>
  );
});

export default BoidView;
