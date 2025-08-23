import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Boid from "./components/Boid";

export default function App() {
  const [mousePosition, setMousePosition] = useState([0, 0, 0]);
  const [leaderPosition, setLeaderPosition] = useState([0, 0, 0]);
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
  }, []);

  const updateMousePosition = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    const worldX = x * 8;
    const worldY = y * 4;

    setMousePosition([worldX, worldY, 0]);
  };
  const handlePositionUpdate = (pos) => {
    setLeaderPosition(pos);
  };
  return (
    <Canvas>
      <ambientLight intensity={0.8} />
      <Boid
        leader
        goalPosition={mousePosition}
        onPositionUpdate={handlePositionUpdate}
      />
      <Boid goalPosition={leaderPosition} />
      <Boid goalPosition={leaderPosition} />
      <Boid goalPosition={leaderPosition} />
      <Boid goalPosition={leaderPosition} />
      <Boid goalPosition={leaderPosition} />
    </Canvas>
  );
}
