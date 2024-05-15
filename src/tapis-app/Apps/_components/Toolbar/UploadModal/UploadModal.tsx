import { Button, Form, FormGroup, Input } from 'reactstrap';
import { GenericModal } from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { ToolbarModalProps } from '../Toolbar';
import styles from './UploadModal.module.scss';
import { useCreate } from 'tapis-hooks/apps';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Apps } from '@tapis/tapis-typescript';
import { focusManager } from 'react-query';

export enum FileOpEventStatus {
  loading = 'loading',
  progress = 'progress',
  error = 'error',
  success = 'success',
  none = 'none',
}

export type FileProgressState = {
  [name: string]: number;
};

type UploadModalProps = ToolbarModalProps & {
  maxFileSizeBytes?: number;
};

const UploadModal: React.FC<UploadModalProps> = ({ toggle }) => {
  const { isLoading, error, isSuccess, submit, data } = useCreate();

  const [file, setFile] = useState<File | null>(null);
  const [app, setApp] = useState<Apps.ReqPostApp | null>(null);

  useEffect(() => {
    const readerFile = async () => {
      if (file) {
        const contents = await file.text();
        const data = JSON.parse(contents) as Apps.ReqPostApp;
        setApp(data);
      }
    };
    readerFile();
  }, [file]);

  useEffect(() => {
    if (isSuccess) {
      focusManager.setFocused(true);
    }
    setFile(null);
  }, [isSuccess]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('file changed');
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = e.target as HTMLInputElement;
    element.value = '';
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (app !== null) {
      submit(app);
    }
  };
  const inputFile = useRef(null);
  return (
    <GenericModal
      toggle={toggle}
      title={`Create new application`}
      body={
        <div>
          <h3> Upload a JSON file with the application specification </h3>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                type="file"
                name="file"
                id="file"
                ref={inputFile}
                onChange={(e) => handleFileChange(e)}
                onClick={(e) => handleFileClick(e)}
              />
            </FormGroup>

            <SubmitWrapper
              isLoading={isLoading}
              error={error}
              success={isSuccess ? `Application created` : ''}
            >
              <Button
                className={styles.submit}
                color="primary"
                disabled={isLoading || isSuccess || !file}
              >
                Submit
              </Button>
            </SubmitWrapper>
          </Form>
        </div>
      }
    />
  );
};

export default UploadModal;
