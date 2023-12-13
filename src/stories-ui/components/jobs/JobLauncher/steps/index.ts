import JobStart from "./JobStart";
import ExecOptions from "./ExecOptions";
import AppArgs from "./AppArgs";
import SchedulerOptions from "./SchedulerOptions";
import JobSubmit from "./JobSubmit";

const jobSteps = [
  JobStart,
  ExecOptions,
  // FileInputs,
  // FileInputArrays,
  AppArgs,
  // EnvVariables,
  SchedulerOptions,
  // Archive,
  JobSubmit,
];

export default jobSteps;
