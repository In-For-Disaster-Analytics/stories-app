import systems from "catalog/systems";
import { FormikInput } from "cookbooks-ui/_common";
import { SubmitWrapper } from "cookbooks-ui/_wrappers";
import { Form, Formik } from "formik";
import React from "react";
import { Button } from "reactstrap";
import * as Yup from "yup";
const Layout: React.FC<{ systemId: string }> = ({ systemId }) => {
  const initialValues = {
    password: "",
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState("");

  const onSubmit = (values: any) => {
    console.log(values);
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
            isLoading={isLoading}
            error={error}
            success={success && "Successfully logged in"}
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
