import BoidView from "./components/BoidView";
import { observer } from "mobx-react-lite";
import { boidStore, parameterStore } from "./store";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Sky } from "@react-three/drei";

const App = observer(() => {
  const parameterConfigs: any = {
    protectedRange: {
      label: "Protected Range",
      value: parameterStore.protectedRange,
      min: 0.1,
      max: 2.0,
      step: 0.1,
      onChange: parameterStore.setProtectedRange,
    },
    visualRange: {
      label: "Visual Range",
      value: parameterStore.visualRange,
      min: 0.5,
      max: 5.0,
      step: 0.1,
      onChange: parameterStore.setVisualRange,
    },
    maxSpeed: {
      label: "Max Speed",
      value: parameterStore.maxSpeed,
      min: 0.1,
      max: 5.0,
      step: 0.1,
      onChange: parameterStore.setMaxSpeed,
    },
    minSpeed: {
      label: "Min Speed",
      value: parameterStore.minSpeed,
      min: 0.01,
      max: 1.0,
      step: 0.01,
      onChange: parameterStore.setMinSpeed,
    },
    cohesionFactor: {
      label: "Cohesion Factor",
      value: parameterStore.cohesionFactor,
      min: 0.005,
      max: 0.5,
      step: 0.001,
      onChange: parameterStore.setCohesionFactor,
    },
    avoidFactor: {
      label: "Avoid Factor",
      value: parameterStore.avoidFactor,
      min: 0.01,
      max: 0.5,
      step: 0.01,
      onChange: parameterStore.setAvoidFactor,
    },
    alignFactor: {
      label: "Align Factor",
      value: parameterStore.alignFactor,
      min: 0.01,
      max: 0.2,
      step: 0.01,
      onChange: parameterStore.setAlignFactor,
    },
    turnFactor: {
      label: "Turn Factor",
      value: parameterStore.turnFactor,
      min: 0.01,
      max: 0.15,
      step: 0.01,
      onChange: parameterStore.setTurnFactor,
    },
  };
  useControls(parameterConfigs);

  return (
    <>
      <Canvas camera={{ fov: 75, near: 2, far: 5000, position: [0, 0, 6.5] }}>
        {boidStore.boids.map(({ id }) => (
          <BoidView boidId={id} key={id} />
        ))}
        <Sky sunPosition={[0, 10, 0]} />
      </Canvas>
    </>
  );
});

export default App;
