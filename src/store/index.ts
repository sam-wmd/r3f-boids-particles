import { randomnumber } from "../utils/mathUtils";
import { Boid } from "../model/Boid";
import { BoidStore } from "./BoidStore";
import ParameterStore from "./ParameterStore";
const parameterStore = new ParameterStore();
const boidStore = new BoidStore({parameterStore: parameterStore});

const initBoids = ()=>{
    boidStore.addBoid({ id: "leader-boid", isLeader: true });
    boidStore.addBoid({ id: "leader-boid2", isLeader: true });
    boidStore.addBoid({ id: "leader-boid3", isLeader: true });
    [...Array(50).keys()].map((_, idx) => boidStore.addBoid({ position:[randomnumber(-5,5),randomnumber(-5,5)],id: `b-${idx}` }));
}
initBoids();
export { boidStore, parameterStore};
