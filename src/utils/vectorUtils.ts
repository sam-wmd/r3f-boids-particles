import { Vector3d } from "model/Vector3d";
import { Vector2 } from "three";

export const normalizeVector3d = (vector:Vector3d) => {
  const [x, y, z] = vector;
  const length = vectorLength(vector);
  return length > 0 ? [x / length, y / length, z / length] : [0, 0, 0];
};
export const vectorLength :([x,y,z]:Vector3d) => number = ([x,y,z]) => Math.sqrt(x ** 2 + y ** 2 + z ** 2);

export const lerpToGoal : (currentPosition:Vector3d, goalPosition:Vector3d) => Vector3d = (currentPosition,goalPosition) =>{
  const lerpFactor = 0.1; // Adjust for smoothness (0.05 = slower, 0.2 = faster)
  const {0:goalX, 1:goalY, 2:goalZ} = goalPosition;
  const {0:prevX, 1:prevY, 2:prevZ} = currentPosition;
  /**
   * lerp formula :
   *  (1-f)*vectorFrom + f*vectorTo
   *  f being the lerpFactor
   */
  return [
    (1 - lerpFactor) * prevX + lerpFactor * goalX,
    (1 - lerpFactor) * prevY + lerpFactor * goalY,
    (1 - lerpFactor) * prevZ + lerpFactor * goalZ,
  ];
};

export const followGoal : (currentPosition:Vector3d, goalPosition:Vector3d, delta:number) => Vector3d = (currentPosition, goalPosition, delta) => {
  const directionVectorToGoal= goalPosition.map(
    (v, i) => v * 0.9 - currentPosition[i] //0.9 so it never actually occupies the same position as the goal, it just stays very close
  ) as Vector3d;
  const distance = vectorLength(directionVectorToGoal);
  // damp speed when nearing goal
  const maxSpeed = 5;
  const dampDistance = 2;
  const speed =
    distance > dampDistance ? maxSpeed : maxSpeed * (distance / dampDistance);
  const normalizedDirVec = normalizeVector3d(directionVectorToGoal);
  const [speedX, speedY, speedZ] = normalizedDirVec.map(
    (v) => v * speed * delta
  );
  const [prevX, prevY, prevZ] = currentPosition;

  return [prevX + speedX, prevY + speedY, prevZ + speedZ];
};
