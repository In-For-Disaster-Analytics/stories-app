import { fronteraSystem } from "./frontera";
import { ls6System } from "./ls6";

const systems = [
  {
    id: "ls6",
    name: "Lonestar 6",
    description:
      "Lonestar 6 is a Dell EMC PowerEdge cluster with Intel Xeon Platinum 8280M processors and NVIDIA A100 GPUs.",
    created: false,
    spec: ls6System,
  },
  {
    id: "frontera",
    name: "Frontera",
    description:
      "The primary computing system was provided by Dell EMC and powered by Intel processors, interconnected by a Mellanox Infiniband HDR and HDR-100 interconnect. The system has 8,008 available compute nodes",
    spec: fronteraSystem,
    created: false,
  },
];

export default systems;
