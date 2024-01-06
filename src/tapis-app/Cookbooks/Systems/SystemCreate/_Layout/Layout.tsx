import systems from "catalog/systems";
import { FormikInput } from "cookbooks-ui/_common";
import { SubmitWrapper } from "cookbooks-ui/_wrappers";
import { Form, Formik } from "formik";
import React from "react";
import { Button } from "reactstrap";
import useCreate from "tapis-hooks/systems/useCreate";
import useCreateCredentials from "tapis-hooks/credentials/useCreate";
import * as Yup from "yup";
import { ReqCreateCredential } from "tapis-hooks/credentials/types";
import { useTapisConfig } from "tapis-hooks";

const Layout: React.FC<{ systemId: string }> = ({ systemId }) => {
  const initialValues = {
    password: "",
  };

  const { claims } = useTapisConfig();
  const username = claims["tapis/username"];
  const { isLoading, error, isSuccess, submit, data } = useCreate();
  const {
    isLoading: isLoadingCredentials,
    error: errorCredentials,
    submit: submitCredentials,
    data: dataCredentials,
  } = useCreateCredentials();

  const onSubmit = (values: any) => {
    if (!system) return;
    system.id = `${system.id}-${username}`;
    submit(system.spec);
    if (isSuccess && data) {
      submitCredentials({
        username: username,
        systemId: system.id,
        request: { password: values.password },
      });
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required."),
  });

  const system = systems.find((system) => system.id === systemId);

  return (
    <div>
      <h1> Create system: {system?.id} </h1>
      <p> {system?.description} </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form id="rename-form">
          <FormikInput
            name="password"
            type="password"
            label={"Password"}
            required={true}
            description="The password for the user."
          />
          <SubmitWrapper
            isLoading={isLoading || isLoadingCredentials}
            error={error || errorCredentials}
            success={isSuccess ? "Successfully logged in" : undefined}
          >
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Create
            </Button>
          </SubmitWrapper>
        </Form>
      </Formik>
    </div>
  );
};

export default Layout;
