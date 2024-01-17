import { Apps } from "@tapis/tapis-typescript";

const llamaNotebookApp: Apps.ReqPostApp = {
  id: "llama-index-environment",
  version: "sha-21437c6",
  description:
    "Run an interactive Jupyter Lab session on an HPC compute node. For the LLama Index Environment",
  owner: "${apiUserId}",
  enabled: true,
  runtime: Apps.RuntimeEnum.Singularity,
  runtimeOptions: [Apps.RuntimeOptionEnum.SingularityRun],
  containerImage: "docker://ghcr.io/mosoriob/llmrepository-docker:sha-21437c6",
  jobType: Apps.JobTypeEnum.Batch,
  maxJobs: -1,
  maxJobsPerUser: -1,
  strictFileInputs: true,
  jobAttributes: {
    execSystemExecDir: "${JobWorkingDir}/jobs/${JobUUID}",
    execSystemInputDir: "${JobWorkingDir}/jobs/${JobUUID}/input",
    execSystemOutputDir: "${JobWorkingDir}/jobs/${JobUUID}/output",
    maxMinutes: 100,
    parameterSet: {
      containerArgs: [
        {
          name: "mount",
          description: "Mount a directory from the host into the container",
          inputMode: Apps.ArgInputModeEnum.Fixed,
          arg: "--bind /share",
        },
      ],
      envVariables: [
        {
          key: "email",
        },
      ],
    },
  },
  tags: ["portalName: ALL"],
  notes: {
    label: "Jupyter Lab HPC (Frontera)",
    helpUrl: "https://jupyterlab.readthedocs.io/en/stable/",
    hideNodeCountAndCoresPerNode: false,
    isInteractive: true,
    gitUrl: "https://github.com/In-For-Disaster-Analytics/cookbooks-ui",
    gitRef: "main",
    rawReadmeUrl:
      "https://raw.githubusercontent.com/In-For-Disaster-Analytics/sites-and-stories-nlp/jupyterenv/README.md",
    icon: "jupyter",
    category: "Data Processing",
  },
};

export default llamaNotebookApp;
