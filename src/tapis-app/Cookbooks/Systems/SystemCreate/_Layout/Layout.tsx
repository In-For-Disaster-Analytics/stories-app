import cookbooksSystems from "catalog/systems";
import { FormikInput, LoadingSpinner } from "cookbooks-ui/_common";
import { SubmitWrapper } from "cookbooks-ui/_wrappers";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Button } from "reactstrap";
import useCreate from "tapis-hooks/systems/useCreate";
import useCreateCredentials from "tapis-hooks/credentials/useCreate";
import * as Yup from "yup";
import { ReqCreateCredential } from "tapis-hooks/credentials/types";
import { useTapisConfig } from "tapis-hooks";
import { useList } from "tapis-hooks/systems";

const Layout: React.FC<{ systemId: string }> = ({ systemId }) => {
  const initialValues = {
    password: "",
  };

  const { claims } = useTapisConfig();

  const username = claims["tapis/username"];
  const { isLoading, error, isSuccess, submit, data } = useCreate();
  const {
    isLoading: isLoadingCredentials,
    isSuccess: isSuccessCredentials,
    error: errorCredentials,
    submit: submitCredentials,
    data: dataCredentials,
  } = useCreateCredentials();

  const { data: systems, isLoading: isLoadingSystems } = useList();

  const onSubmit = async (values: any) => {
    if (!cookbookSystem) return;
    await submitCredentials({
      username: username,
      systemId: cookbookSystem.spec.id,
      request: { password: values.password },
    });
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required."),
  });

  const cookbookSystem = cookbooksSystems.find(
    (system) => system.id === systemId
  );

  useEffect(() => {
    if (!cookbookSystem) return;
    const systemCreated = systems?.result?.find(
      (system) => system.id === cookbookSystem.spec.id
    );
    console.log(systemCreated);
    if (!systemCreated) submit(cookbookSystem.spec);
  }, [systems]);

  const renderLoading = (
    <>
      <LoadingSpinner placement="inline" />
    </>
  );

  const renderform = (
    <div>
      <h1> Create system: {cookbookSystem?.id} </h1>
      <p> {cookbookSystem?.description} </p>
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
            success={isSuccessCredentials ? "System created" : undefined}
          >
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={
                isLoadingCredentials || isSuccessCredentials ? true : false
              }
            >
              Create
            </Button>
          </SubmitWrapper>
        </Form>
      </Formik>
    </div>
  );
  if (isLoading) return renderLoading;
  if (error) <div>{error?.message}</div>;
  return renderform;
};

export default Layout;
