import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { WizardStep } from "tapis-ui/_wrappers/Wizard";
import { Jobs, Systems } from "@tapis/tapis-typescript";
import { useJobLauncher } from "./components";
import { useSubmit } from "tapis-hooks/jobs";
import { SubmitWrapper } from "tapis-ui/_wrappers";
import arrayStyles from "./FieldArray.module.scss";
import { Button } from "reactstrap";

const SignupSchema = Yup.object().shape({});

type WizardProps<T> = {
  steps: Array<WizardStep<T>>;
  memo?: any;
  formSubmit: (values: Partial<T>) => void;
};

export function JupyterNotebookLauncher<T>({
  steps,
  memo,
  formSubmit,
}: WizardProps<T>) {
  const { job, app, systems } = useJobLauncher();
  const { isLoading, error, isSuccess, submit } = useSubmit(
    app.id!,
    app.version!
  );

  const system = systems.find(
    (sys) => sys.systemType === Systems.SystemTypeEnum.Linux
  );
  job.execSystemId = system?.id;
  if (job.parameterSet?.schedulerOptions?.length === 0) {
    job.parameterSet?.schedulerOptions?.push({
      arg: "-A BCS23003",
      name: "chargeProject",
      include: true,
      description: "Project to charge",
    });
    job.parameterSet?.schedulerOptions?.push({
      arg: "--tapis-profile tacc",
      name: "profile",
      include: true,
      description: "The tapis-profile value set in execution system.",
    });
  }

  const onSubmit = useCallback(
    (values) => {
      // job.parameterSet?.appArgs?.forEach((arg) => {
      //   if (arg.name === "image_url") {
      //     arg.arg = values.url;
      //   }
      // });
      submit(job as Jobs.ReqSubmitJob);
    },
    [submit, job]
  );

  return (
    <div>
      <h3>Jupyter Notebook Launcher</h3>
      <div className={arrayStyles.array}>
        <SubmitWrapper
          isLoading={isLoading}
          error={error}
          success={isSuccess ? ` ` : ""}
        >
          <Formik
            initialValues={
              {
                // url: "",
              }
            }
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* <Field name="url" fullWidth label="Photo URL" style={mystyle} />
                {errors.url && touched.url ? <div>{errors.url}</div> : null} */}
                <Button color="primary" type="submit">
                  Submit Job
                </Button>
              </Form>
            )}
          </Formik>
        </SubmitWrapper>
      </div>
    </div>
  );
}
