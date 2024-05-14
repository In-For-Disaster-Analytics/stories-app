import useAppsOperations from './useAppsOperations';

export enum AppsOpEventStatusEnum {
  waiting = 'waiting',
  loading = 'loading',
  error = 'error',
  success = 'success',
  none = 'none',
}

export type AppsOpState = {
  [path: string]: {
    status: AppsOpEventStatusEnum;
    error?: Error;
  };
};

export default useAppsOperations;
