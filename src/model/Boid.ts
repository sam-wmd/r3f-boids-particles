import { makeObservable, observable, action, computed } from "mobx";
import { BoidStore } from "./BoidStore";
import { lerpToGoal, vectorLength2d } from "utils/vectorUtils";
import { Vector2d } from "./Vector2d";

interface IArgs{
  id:string,
  position: number[],
  boidStore: BoidStore,
  isLeader: boolean
}
export class Boid {
  id = "";
  position:number[] = [0,0]
  isLeader :boolean= false;
  boidStore: BoidStore;
  protectedRange: number = 0.5;
  visualRange: number = 2;
  directionVector: Vector2d = new Vector2d(1,0);
  otherBoids: Boid[];
  SCREEN_LEFT_BOUNDARY = -7;
  SCREEN_RIGHT_BOUNDARY = 7;
  SCREEN_TOP_BOUNDARY = 3;
  SCREEN_BOTTOM_BOUNDARY = -3;
  MAX_SPEED = 0.5;
  constructor({ id, position = [0,0], boidStore, isLeader = false }: IArgs) {
    makeObservable(this, {
      position: observable,
      isLeader: observable,
      protectedRange: observable,
      visualRange: observable,
      directionVector: observable,
      otherBoids: observable,
      goalPosition: computed,
      updatePosition: action,
    });
    this.id = id;
    this.position = position
    this.isLeader = isLeader;
    this.boidStore = boidStore;
    this.otherBoids = boidStore.boids.filter(b => b.id !== this.id)
  }

  updatePosition(newPosition:number[]) {
    this.position = newPosition;
  }
  lerpTo(goal:number[]){
    const lerpFactor= 0.1;
    this.position[0] = (1 - lerpFactor) * this.pos_x + lerpFactor * goal[0];
    this.position[1] = (1 - lerpFactor) * this.pos_y + lerpFactor * goal[1];
  }
  move(){
    if (this.directionVector.length() > this.MAX_SPEED){
      this.directionVector.x = (this.directionVector.x/this.directionVector.length()) * this.MAX_SPEED
      this.directionVector.y = (this.directionVector.y/this.directionVector.length()) * this.MAX_SPEED
    }
    const newPosX = this.pos_x + this.directionVector.x
    const newPosY = this.pos_y + this.directionVector.y
    this.lerpTo([newPosX,newPosY])
  }

  followLeader(){
    if (!this.isLeader){
      const nearestLeader:Boid|undefined = this.boidStore?.leaders.sort((a,b)=>this.distanceTo(a) - this.distanceTo(b))[0]
      if (nearestLeader!= undefined)
        this.lerpTo(nearestLeader.position)
    }
  }
  avoidNeighbors(delta:number){
    const avoidFactor = 0.2;
    let close_dx = 0
    let close_dy = 0
    this.boidStore.boids.filter(b => b.id !== this.id)
    .filter(otherBoid => this.distanceTo(otherBoid) < this.protectedRange)
    .forEach(other => {
      close_dx += this.pos_x - other.pos_x;
      close_dy += this.pos_y - other.pos_y;
    })
    this.directionVector.x += (close_dx*avoidFactor)
    this.directionVector.y += (close_dy*avoidFactor)
  }

  alignment(){
    const alignFactor = 0.2
    const alignVec:Vector2d = this.otherBoids.filter(b => this.distanceTo(b) < this.visualRange)
      .map(b =>b.directionVector)
      .reduce((prev,current)=>new Vector2d(prev.x+current.x,prev.y+current.y),new Vector2d(0,0))
    this.directionVector.x += alignVec.x*alignFactor
    this.directionVector.y += alignVec.y*alignFactor
  }

  distanceTo(otherBoid:Boid):number{
    return new Vector2d(otherBoid.pos_x-this.pos_x,otherBoid.pos_y-this.pos_y).length()
  }

  avoidEdges(){
    const turnFactor = 0.8
    if (this.pos_x < this.SCREEN_LEFT_BOUNDARY)
      this.directionVector.x += turnFactor

    if (this.pos_x > this.SCREEN_RIGHT_BOUNDARY)
      this.directionVector.x -= turnFactor
    
    if (this.pos_y < this.SCREEN_BOTTOM_BOUNDARY)
      this.directionVector.y += turnFactor

    if (this.pos_y > this.SCREEN_TOP_BOUNDARY)
      this.directionVector.y -= turnFactor
  }

  get pos_x(){
    return this.position[0]
  }

  get pos_y(){
    return this.position[1]
  }
  get goalPosition() {
    return this.isLeader
      ? this.boidStore.mousePosition
      : this.boidStore?.leaders[0].position;
  }
}
