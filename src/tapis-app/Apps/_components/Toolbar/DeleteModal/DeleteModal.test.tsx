import { act, fireEvent, screen } from '@testing-library/react';
import renderComponent from 'utils/testing';
import DeleteModal from './DeleteModal';
import { useDelete } from 'tapis-hooks/apps';
import { useMutations } from 'tapis-hooks/utils';
import { tapisApp } from 'fixtures/apps.fixtures';
import { useAppsSelect } from 'tapis-app/Apps/_components/AppsContext';

jest.mock('tapis-hooks/utils');
jest.mock('tapis-hooks/apps');
jest.mock('tapis-app/Apps/_components/AppsContext');

describe('DeleteModal', () => {
  it('performs delete operations', async () => {
    const mockRun = jest.fn();
    (useMutations as jest.Mock).mockReturnValue({
      run: mockRun,
    });

    const mockDeleteAppAsync = jest.fn();
    const mockReset = jest.fn();
    (useDelete as jest.Mock).mockReturnValue({
      deleteAppAsync: mockDeleteAppAsync,
      reset: mockReset,
      error: null,
      isSuccess: false,
      isLoading: false,
    });

    (useAppsSelect as jest.Mock).mockReturnValue({
      selectedApps: [tapisApp],
    });

    renderComponent(<DeleteModal toggle={() => {}} />);

    const button = screen.getByLabelText('Submit');
    await act(async () => {
      fireEvent.click(button);
    });

    // expect((useMutations as jest.Mock).mock.calls[0][0].fn).toEqual(
    //   mockDeleteAppAsync
    // );
    // expect(mockRun.mock.calls[0][0][0].path).toEqual('FullJobAttrs');
  });
});
