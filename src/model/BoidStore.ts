import { action, computed, makeObservable, observable } from "mobx";
import { Boid } from "./Boid";
type AddBoidParams ={
  id:string,
  isLeader?: boolean,
  position?: number[]
}
export class BoidStore {
  mousePosition:number[] = [0, 0];
  boids :Array<Boid>= [];

  constructor() {
    makeObservable(this, {
      mousePosition: observable,
      boids: observable,
      leaders: computed,
      followers: computed,
      updateMousePosition: action,
      addBoid: action,
    });
  }

  get leaders() {
    return this.boids.filter((b) => b.isLeader);
  }

  get followers() {
    return this.boids.filter((b) => !b.isLeader);
  }

  getbyId(id:string) {
    return this.boids.find((b) => b.id == id);
  }

  updateMousePosition = (newPos:number[]) => {
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
