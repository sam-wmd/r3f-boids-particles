import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import BoidView from "./components/BoidView";
import { observer } from "mobx-react-lite";
import { store } from "./store";

const App = observer(() => {
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
  }, []);

  const updateMousePosition = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    const worldX = x * 8;
    const worldY = y * 4;
    store.mousePosition = [worldX, worldY, 0];
  };
  return (
    <Canvas>
      <ambientLight intensity={0.8} />
      {store.boids.map(({ id }) => (
        <BoidView boidId={id} key={id} />
      ))}
    </Canvas>
  );
});

export default App;
