import React, { useCallback, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { Icon } from "tapis-ui/_common";
import styles from "./Creator.module.scss";
import useCreate from "tapis-hooks/apps/useCreate";
import llamaNotebookApp from "catalog/apps/llama-notebook";

const CookbookCreator: React.FC = () => {
  const { isLoading, error, isSuccess, submit, data } = useCreate();

  useEffect(() => {
    llamaNotebookApp.id = `${llamaNotebookApp.id}-${Date.now()}`;
    submit(llamaNotebookApp);
  }, []);

  if (isLoading) {
    return <div> Creating coookbooks</div>;
  }

  if (isSuccess) {
    return <div> Successfully created cookbooks</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className={styles["card-header"]}>
          <div>
            <Icon name="applications" className="dashboard__card-icon" />
          </div>
          <div>No apps available</div>
        </div>
      </CardHeader>
      <CardBody>
        <CardTitle tag="h5">
          <div>0 apps</div>
        </CardTitle>
        <CardText>
          You do not have access to any apps. Please contact your TAPIS
          administrator.
        </CardText>
      </CardBody>
    </Card>
  );
};

export default CookbookCreator;
