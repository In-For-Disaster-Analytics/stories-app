import { useMutations } from 'tapis-hooks/utils';
import { useReducer, useState } from 'react';
import { MutationFunction } from 'tapis-hooks/utils/useMutations';
import { AppsOpEventStatusEnum, AppsOpState } from '.';

type UseAppsOperationsParams<T, ResponseType> = {
  fn: MutationFunction<T, ResponseType>;
  key?: (item: T) => string;
  onComplete?: () => void;
};

interface AppsParamType {
  id?: string;
}

const useAppsOperations = <
  T extends AppsParamType,
  ResponseType extends unknown
>({
  // Mutation function to run
  fn,
  // Optional identifier function for the state dictionary
  key = (item: T) => item.id!,
  onComplete,
}: UseAppsOperationsParams<T, ResponseType>) => {
  const [started, setStarted] = useState(false);

  const reducer = (
    state: AppsOpState,
    action: { item: T; status: AppsOpEventStatusEnum; error?: Error }
  ) => {
    const { item, status, error } = action;
    return {
      ...state,
      [key(item)]: { status, error },
    };
  };

  const [state, dispatch] = useReducer(reducer, {} as AppsOpState);

  const onStart = (item: T) =>
    dispatch({
      item,
      status: AppsOpEventStatusEnum.loading,
    });
  const onSuccess = (item: T) =>
    dispatch({
      item,
      status: AppsOpEventStatusEnum.success,
    });
  const onError = (item: T, error: Error) =>
    dispatch({
      item,
      status: AppsOpEventStatusEnum.error,
      error,
    });

  const { run, isLoading, isFinished } = useMutations<T, ResponseType>({
    fn,
    onStart,
    onSuccess,
    onError,
    onComplete,
  });

  const errorEntry = Object.entries(state).find(([_, state]) => state.error);
  const error = errorEntry ? errorEntry[1].error! : null;
  const isSuccess = !isLoading && !error && started;

  return {
    run: (items: T[]) => {
      setStarted(true);
      return run(items);
    },
    isLoading,
    isFinished,
    isSuccess,
    error,
    state,
  };
};

export default useAppsOperations;
