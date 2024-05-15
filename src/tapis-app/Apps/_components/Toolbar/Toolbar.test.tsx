import renderComponent from 'utils/testing';
import Toolbar from './Toolbar';
import { useAppsSelect } from 'tapis-app/Apps/_components/AppsContext';
import '@testing-library/jest-dom/extend-expect';
import { tapisApp } from 'fixtures/apps.fixtures';

jest.mock('tapis-hooks/apps');
jest.mock('tapis-app/Apps/_components/AppsContext');

describe('Toolbar', () => {
  beforeEach(() => {});

  it('enables the move, copy, download and delete buttons', async () => {
    (useAppsSelect as jest.Mock).mockReturnValue({
      selectedApps: [tapisApp, { ...tapisApp, type: 'dir' }],
    });

    const { getByLabelText } = renderComponent(<Toolbar />);

    const deleteBtn = getByLabelText('Delete');
    expect(deleteBtn).toBeDefined();
    expect(deleteBtn.closest('button')).not.toHaveAttribute('disabled');
  });
});
