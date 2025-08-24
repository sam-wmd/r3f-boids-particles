import { Boid } from "../model/Boid";
import { BoidStore } from "../model/BoidStore";

const store = new BoidStore();
store.addBoid({ id: "leader-boid", isLeader: true });
[...Array(8).keys()].map((_, idx) => store.addBoid({ id: `b-${idx}` }));
export { store };
