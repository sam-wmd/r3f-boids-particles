import { vectorLength } from "utils/vectorUtils";

export class Vector2d{
    
    x:number;
    y:number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }

    normalize(): Vector2d{
        return new Vector2d(this.x/this.length(),this.y/this.length());
    }

    length(): number{
        return Math.sqrt(this.x**2 + this.y**2)
    }

    times(f:number){
        return new Vector2d(this.x *= f,this.y *= f)
    }
}