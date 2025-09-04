import { makeObservable, observable, action, computed } from "mobx";
import { BoidStore } from "../store/BoidStore";
import { Vector2d } from "./Vector2d";
import ParameterStore from "../store/ParameterStore";
import { interpolatePoint } from "../utils/vectorUtils";

interface IArgs{
  id:string,
  position: number[],
  boidStore: BoidStore,
  isLeader: boolean,
  parameterStore: ParameterStore
}
export class Boid {
  id = "";
  position:number[] = [0,0]
  isLeader :boolean= false;
  boidStore: BoidStore;
  directionVector: Vector2d = new Vector2d(1,0);
  otherBoids: Boid[];
  rotation: number= 0;


  constructor({ id, position = [0,0], boidStore, isLeader = false }: IArgs) {
    makeObservable(this, {
      position: observable,
      isLeader: observable,
      directionVector: observable,
      otherBoids: observable,
      rotation: observable,
      boidStore: observable,
      goalPosition: computed,
      updatePosition: action,
      lerpTo: action,
      cohesion: action,
      alignment: action,
      avoidEdges: action,
      avoidNeighbors: action,
      setRotation: action,
      move: action
    });
    this.id = id;
    this.position = position
    this.isLeader = isLeader;
    this.boidStore = boidStore;
    this.otherBoids = boidStore.boids.filter(b => b.id !== this.id)
  }
  setRotation(newRotation:number){
    this.rotation = this.rotation;
  }
  updatePosition(newPosition:number[]) {
    this.position = newPosition;
  }
  lerpTo(goal:number[]){
    const lerpFactor= 0.02;
    this.position[0] = (1 - lerpFactor) * this.pos_x + lerpFactor * goal[0];
    this.position[1] = (1 - lerpFactor) * this.pos_y + lerpFactor * goal[1];
  }


  move(){
    if (this.directionVector.length() > this.boidStore.parameterStore.maxSpeed){
      this.directionVector.x = (this.directionVector.x/this.directionVector.length()) * this.boidStore.parameterStore.maxSpeed
      this.directionVector.y = (this.directionVector.y/this.directionVector.length()) * this.boidStore.parameterStore.maxSpeed
    }
    if(this.directionVector.length() < this.boidStore.parameterStore.minSpeed){
      this.directionVector.x = (this.directionVector.x/this.directionVector.length()) * this.boidStore.parameterStore.minSpeed
      this.directionVector.y = (this.directionVector.y/this.directionVector.length()) * this.boidStore.parameterStore.minSpeed
    }
    const newPosX = this.pos_x + this.directionVector.x
    const newPosY = this.pos_y + this.directionVector.y

    // smooth step to next position
    const {x,y} = interpolatePoint(this.pos_x,this.pos_y,newPosX,newPosY,0.1)
    this.position[0] = x
    this.position[1] = y

    // some rotation
    const targetRotation = Math.atan2(
        this.directionVector.y,
        this.directionVector.x
      );
    this.rotation += (targetRotation - this.rotation) * 0.1;
  }

  followLeader(){
    if (!this.isLeader){
      const nearestLeader:Boid|undefined = this.boidStore?.leaders.sort((a,b)=>this.distanceTo(a) - this.distanceTo(b))[0]
      if (nearestLeader!= undefined)
        this.lerpTo(nearestLeader.position)
    }
  }
  avoidNeighbors(){
    let close_dx = 0
    let close_dy = 0
    this.boidStore.boids.filter(b => b.id !== this.id)
    .filter(otherBoid => this.distanceTo(otherBoid) < this.boidStore.parameterStore.protectedRange)
    .forEach(other => {
      close_dx += this.pos_x - other.pos_x;
      close_dy += this.pos_y - other.pos_y;
    })
    this.directionVector.x += (close_dx*this.boidStore.parameterStore.avoidFactor)
    this.directionVector.y += (close_dy*this.boidStore.parameterStore.avoidFactor)
  }

  visibleBoids(): Boid[]{
    return this.otherBoids.filter(b => this.distanceTo(b) < this.boidStore.parameterStore.visualRange)
  }
  /**
   * try to head in the same direction as the others
   * */
  alignment(){
    const alignVec:Vector2d = this.visibleBoids()
      .map(b =>b.directionVector)
      .reduce((prev,current)=>new Vector2d(prev.x+current.x,prev.y+current.y),new Vector2d(0,0))
    this.directionVector.x += alignVec.x*this.boidStore.parameterStore.alignFactor
    this.directionVector.y += alignVec.y*this.boidStore.parameterStore.alignFactor
  }

  /**
   * head towards the center of mass of neighbors
   */
  cohesion(){
    let x_avg = 0;
    let y_avg = 0
    let countNeighbors = this.visibleBoids().length
    if (countNeighbors > 0){
      this.visibleBoids()
        .forEach((b)=>{
          x_avg+=b.pos_x;
          y_avg+=b.pos_y; 
        })
      x_avg = x_avg/countNeighbors
      y_avg = y_avg/countNeighbors
    }
    this.directionVector.x +=(x_avg - this.pos_x)*this.boidStore.parameterStore.cohesionFactor
    this.directionVector.y +=(y_avg - this.pos_y)*this.boidStore.parameterStore.cohesionFactor
  }

  distanceTo(otherBoid:Boid):number{
    return new Vector2d(otherBoid.pos_x-this.pos_x,otherBoid.pos_y-this.pos_y).length()
  }
  
  /**
   * Avoid screen edges
   */
  avoidEdges(){
    if (this.pos_x <= this.boidStore.parameterStore.screenLeftBoundary)
      this.directionVector.x += this.boidStore.parameterStore.turnFactor

    if (this.pos_x >= this.boidStore.parameterStore.screenRightBoundary)
      this.directionVector.x -= this.boidStore.parameterStore.turnFactor
    
    if (this.pos_y <= this.boidStore.parameterStore.screenBottomBoundary)
      this.directionVector.y += this.boidStore.parameterStore.turnFactor

    if (this.pos_y >= this.boidStore.parameterStore.screenTopBoundary)
      this.directionVector.y -= this.boidStore.parameterStore.turnFactor
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
