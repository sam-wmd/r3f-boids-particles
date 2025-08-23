export const normalizeVector3d = (vector) => {
  const [x, y, z] = vector;
  const length = vectorLength(vector);
  return length > 0 ? [x / length, y / length, z / length] : [0, 0, 0];
};
export const vectorLength = ([x, y, z]) => Math.sqrt(x ** 2 + y ** 2 + z ** 2);

export const lerpToGoal = (currentPosition, goalPosition) => {
  const lerpFactor = 0.1; // Adjust for smoothness (0.05 = slower, 0.2 = faster)
  const [goalX, goalY, goalZ] = goalPosition;
  const [prevX, prevY, prevZ] = currentPosition;
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

export const followGoal = (currentPosition, goalPosition, delta) => {
  const directionVectorToGoal = goalPosition.map(
    (v, i) => v * 0.9 - currentPosition[i] //0.9 so it never actually occupies the same position as the goal, it just stays very close
  );
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
