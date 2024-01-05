import { ls6System } from "./ls6";

const systems = [
  {
    id: "ls6",
    name: "Lonestar 6",
    description:
      "Lonestar 6 is a Dell EMC PowerEdge cluster with Intel Xeon Platinum 8280M processors and NVIDIA A100 GPUs.",
    spec: ls6System,
  },
  {
    id: "ls7",
    name: "System 2",
    description: "System 2 description",
    spec: ls6System,
  },
  {
    id: "ls8",
    name: "System 3",
    description: "System 3 description",
    spec: ls6System,
  },
];

export default systems;
