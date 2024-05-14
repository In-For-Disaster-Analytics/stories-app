import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderComponent from 'utils/testing';
import CookbookListing from './CookbookListing';
import { tapisApp } from 'fixtures/apps.fixtures';
import { Apps } from '@tapis/tapis-typescript';
import { useList } from 'tapis-hooks/apps';

jest.mock('tapis-hooks/apps');

describe('Cookbooks', () => {
  it('renders Cookbook Listing component', () => {
    (useList as jest.Mock).mockReturnValue({
      data: {
        result: [tapisApp],
      },
      isLoading: false,
      error: null,
    });
    const { getAllByText } = renderComponent(<CookbookListing />);
    expect(getAllByText(/FullJobAttrs/).length).toEqual(1);
    // expect(getAllByText(/01\/01\/2020/).length).toEqual(1);
    // expect(getAllByText(/29.3 kB/).length).toEqual(1);
  });

  it('performs cookbook selection', () => {
    (useList as jest.Mock).mockReturnValue({
      data: {
        result: [tapisApp],
      },
      isLoading: false,
      error: null,
    });
    const mockOnSelect = jest.fn();
    const { getByTestId } = renderComponent(
      <CookbookListing
        selectMode={{ mode: 'single', types: ['dir', 'app'] }}
        onSelect={mockOnSelect}
      />
    );
    // Find the file1.txt and file2.txt rows
    const app1 = getByTestId('FullJobAttrs');
    expect(app1).toBeDefined();

    // Click on file1.txt and expect the select callback to have run
    app1.click();
    expect(mockOnSelect).toHaveBeenLastCalledWith([tapisApp]);
  });

  it('performs file unselection', () => {
    (useList as jest.Mock).mockReturnValue({
      data: {
        result: [tapisApp],
      },
      isLoading: false,
      error: null,
    });
    const mockOnUnselect = jest.fn();
    const { getByTestId } = renderComponent(
      <CookbookListing
        selectMode={{ mode: 'single', types: ['dir', 'app'] }}
        selectedApps={[tapisApp]}
        onUnselect={mockOnUnselect}
      />
    );
    // Find the file1.txt and file2.txt rows
    const app1 = getByTestId('FullJobAttrs');
    expect(app1).toBeDefined();

    // Click on file1.txt and expect the unselect callback to have run
    app1.click();
    expect(mockOnUnselect).toHaveBeenLastCalledWith([tapisApp]);
  });

  it('performs select all', () => {
    const concatenatedResults: Array<Apps.TapisApp> = [
      tapisApp,
      { ...tapisApp, uuid: 'd3412826-13fc-4709-b9d9-26ccbc0ecbd4' },
    ];
    (useList as jest.Mock).mockReturnValue({
      data: {
        result: concatenatedResults,
      },
      isLoading: false,
      error: null,
    });
    const mockOnSelect = jest.fn();
    const mockOnUnselect = jest.fn();
    const { getByTestId } = renderComponent(
      <CookbookListing
        selectMode={{ mode: 'multi', types: ['dir', 'app'] }}
        selectedApps={[tapisApp]}
        onSelect={mockOnSelect}
        onUnselect={mockOnUnselect}
      />
    );
    // Find the file1.txt and file2.txt rows
    const selectAll = getByTestId('select-all');
    expect(selectAll).toBeDefined();

    // Click on file1.txt and expect the unselect callback to have run
    selectAll.click();
    expect(mockOnSelect).toHaveBeenCalledWith(concatenatedResults);

    selectAll.click();
    expect(mockOnUnselect).toHaveBeenCalledWith(concatenatedResults);
  });
});
