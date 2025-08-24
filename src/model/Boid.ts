import { makeObservable, observable, action, computed } from "mobx";
import { BoidStore } from "./BoidStore";
import { Vector3d } from "./Vector3d";

interface IArgs{
  id:string,
  position: Vector3d,
  boidStore: BoidStore,
  isLeader: boolean
}
export class Boid {
  id = "";
  position:Vector3d = [0, 0, 0];
  isLeader :boolean= false;
  boidStore: BoidStore;

  constructor({ id, position = [0, 0, 0], boidStore, isLeader = false }: IArgs) {
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

  updatePosition(newPosition:Vector3d) {
    this.position = newPosition;
  }

  get goalPosition() {
    return this.isLeader
      ? this.boidStore.mousePosition
      : this.boidStore?.leader?.position;
  }
}
