import imgClassifyApp from "./img-classify-mosorio";
import llamaNotebookApp from "./llama-notebook";

const apps = [
  {
    name: "LLama Index Environment",
    description:
      "Run an interactive Jupyter Lab session on an HPC compute node. For the LLama Index Environment",
    spec: llamaNotebookApp,
  },
  {
    name: "Image classification",
    description: "Image classification using a pre-trained model",
    spec: imgClassifyApp,
  },
];

export default apps;
