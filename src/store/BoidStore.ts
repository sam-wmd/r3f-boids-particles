import { action, computed, makeObservable, observable, reaction } from "mobx";
import { Boid } from "../model/Boid";
import ParameterStore from "./ParameterStore";
type AddBoidParams ={
  id:string,
  isLeader?: boolean,
  position?: number[]
}
type IConstructorArgs = {
  parameterStore: ParameterStore
}
export class BoidStore {
  mousePosition:number[] = [0, 0];
  boids :Array<Boid>= [];
  parameterStore: ParameterStore;

  constructor({parameterStore}:IConstructorArgs) {
    makeObservable(this, {
      mousePosition: observable,
      boids: observable,
      leaders: computed,
      followers: computed,
      getBoids: computed,
      updateMousePosition: action,
      addBoid: action,
      parameterStore: observable
    });
    this.parameterStore = parameterStore
  }

  get getBoids(){
    return this.boids;
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
      parameterStore: this.parameterStore
    });
    this.boids.push(boid);
  }
}
