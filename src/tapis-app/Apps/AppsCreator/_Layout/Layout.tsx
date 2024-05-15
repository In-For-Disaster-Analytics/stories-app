/**
 * A form for adding a new app:
 *
 *  It has one Input field for the app link.
 *
 */
import { Apps } from '@tapis/tapis-typescript';
import React, { useEffect, useRef, useState } from 'react';

import styles from './AppCreator.module.css';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useCreate } from 'tapis-hooks/apps';
import { SubmitWrapper } from 'tapis-ui/_wrappers';

export const Layout: React.FC = () => {
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
    <div className={styles.container}>
      <div>
        <h2> Create new application </h2>
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
    </div>
  );
};

export default React.memo(Layout);
