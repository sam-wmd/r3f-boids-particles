import { randomnumber } from "../utils/mathUtils";
import { Boid } from "../model/Boid";
import { BoidStore } from "../model/BoidStore";

const store = new BoidStore();
store.addBoid({ id: "leader-boid", isLeader: true });
store.addBoid({ id: "leader-boid2", isLeader: true });
store.addBoid({ id: "leader-boid3", isLeader: true });
[...Array(15).keys()].map((_, idx) => store.addBoid({ position:[10-idx,1/(randomnumber(1,10))],id: `b-${idx}` }));
export { store };
