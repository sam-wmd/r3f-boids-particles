import { useFrame } from "@react-three/fiber";
import { RefObject, Suspense, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Mesh } from "three";
import { boidStore } from "../store";
import { Boid } from "model/Boid";
import Model from "../gltf/Model";

type Props = {
  boidId: string;
};
const BoidView = observer(({ boidId }: Props) => {
  const boid: Boid | undefined = boidStore.getbyId(boidId);
  if (boid != undefined) {
    useFrame(() => {
      boid.avoidEdges();
      boid.avoidNeighbors();
      boid.alignment();
      boid.move();
    });
  }
  return (
    <>
      {boid && <Model x={boid.pos_x} y={boid.pos_y} rotation={boid.rotation} />}
    </>
  );
});

export default BoidView;
