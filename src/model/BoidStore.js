import { action, computed, makeObservable, observable } from "mobx";
import { Boid } from "./Boid";

export class BoidStore {
  mousePosition = [0, 0, 0];
  boids = [];

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

  getbyId(id) {
    return this.boids.find((b) => b.id == id);
  }

  updateMousePosition = (newPos) => {
    this.mousePosition = newPos;
  };

  addBoid({ id, isLeader = false, position = [0, 0, 0] }) {
    const boid = new Boid({
      id: id,
      boidStore: this,
      isLeader: isLeader,
      position: position,
    });
    this.boids.push(boid);
  }
}
