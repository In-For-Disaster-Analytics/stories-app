import llamaNotebookApp from "catalog/apps/llama-notebook";
import { useCallback, useEffect } from "react";
import { Button } from "reactstrap";
import create from "tapis-api/apps/create";
import useCreate from "tapis-hooks/apps/useCreate";

export const AppCreate: React.FC = () => {
  const { isLoading, error, isSuccess, submit, data } = useCreate();
  const onCreate = useCallback(() => {
    llamaNotebookApp.id = `${llamaNotebookApp.id}-${Date.now()}`;
    submit(llamaNotebookApp);
  }, [submit]);

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess]);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      <Button
        color="primary"
        disabled={isLoading || isSuccess}
        onClick={onCreate}
      >
        Create default template
      </Button>
    </div>
  );
};
