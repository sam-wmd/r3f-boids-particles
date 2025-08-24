import { action, computed, makeObservable, observable } from "mobx";
import { Boid } from "./Boid";
import { Vector3d } from "./Vector3d";
type AddBoidParams ={
  id:string,
  isLeader?: boolean,
  position?: Vector3d
}
export class BoidStore {
  mousePosition:Vector3d = [0, 0, 0];
  boids :Array<Boid>= [];

  constructor() {
    makeObservable(this, {
      mousePosition: observable,
      boids: observable,
      leader: computed,
      followers: computed,
      updateMousePosition: action,
      addBoid: action,
    });
  }

  get leader() {
    return this.boids.find((b) => b.isLeader);
  }

  get followers() {
    return this.boids.filter((b) => !b.isLeader);
  }

  getbyId(id:string) {
    return this.boids.find((b) => b.id == id);
  }

  updateMousePosition = (newPos: Vector3d) => {
    this.mousePosition = newPos;
  };

  addBoid({ id, isLeader = false, position = [0, 0, 0] }: AddBoidParams) {
    const boid = new Boid({
      id: id,
      boidStore: this,
      isLeader: isLeader,
      position: position,
    });
    this.boids.push(boid);
  }
}
