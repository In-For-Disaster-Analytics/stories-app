import { useQuery, QueryObserverOptions } from 'react-query';
import { list } from 'upstream-api/projects';
import { Jobs } from '@tapis/tapis-typescript';
import QueryKeys from './queryKeys';
import { useUpstreamConfig } from 'upstream-hooks/context';
import members from 'upstream-api/projects/members';

export const defaultParams: Jobs.GetJobListRequest = {
  orderBy: 'created(desc)',
};

const useList = (project_id: number) => {
  const { accessToken, basePath } = useUpstreamConfig();
  const result = useQuery<any, Error>(
    [QueryKeys.list, accessToken],
    // Default to no token. This will generate a 403 when calling the list function
    // which is expected behavior for not having a token
    () => {
      return members(project_id, basePath, accessToken?.access_token ?? '');
    },
    {
      enabled: !!accessToken,
    }
  );
  return result;
};

export default useList;
