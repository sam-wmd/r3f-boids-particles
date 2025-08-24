import { makeObservable, observable, action, computed } from "mobx";
export class Boid {
  id = "";
  position = [0, 0, 0];
  isLeader = false;
  boidStore;

  constructor({ id, position = [0, 0, 0], boidStore, isLeader = false }) {
    makeObservable(this, {
      position: observable,
      isLeader: observable,
      goalPosition: computed,
      updatePosition: action,
    });
    this.id = id;
    this.position = position;
    this.isLeader = isLeader;
    this.boidStore = boidStore;
  }

  updatePosition(newPosition) {
    this.position = newPosition;
  }

  get goalPosition() {
    return this.isLeader
      ? this.boidStore.mousePosition
      : this.boidStore.leader.position;
  }
}
