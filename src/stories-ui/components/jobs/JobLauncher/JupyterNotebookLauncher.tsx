import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { WizardStep } from "cookbooks-ui/_wrappers/Wizard";
import { Jobs, Systems } from "@tapis/tapis-typescript";
import { useJobLauncher } from "./components";
import { useSubmit } from "tapis-hooks/jobs";
import { SubmitWrapper } from "cookbooks-ui/_wrappers";
import arrayStyles from "./FieldArray.module.scss";
import { Button } from "reactstrap";
import ReadmeViewer from "tapis-app/Cookbook/Readme";
import { LayoutHeader } from "cookbooks-ui/_common";

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
      submit(job as Jobs.ReqSubmitJob);
    },
    [submit, job]
  );

  return system ? (
    <div>
      <LayoutHeader type={"sub-header"}>
        {app.id} v{app.version}
      </LayoutHeader>
      <LayoutHeader type={"sub-header"}>
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
                  Run
                </Button>
              </Form>
            )}
          </Formik>
        </SubmitWrapper>
      </LayoutHeader>
      <ReadmeViewer id={app.id} version={app.version} notes={app.notes} />
    </div>
  ) : (
    <>
      <p> No Linux system found. Please add a Linux System</p>
    </>
  );
}
