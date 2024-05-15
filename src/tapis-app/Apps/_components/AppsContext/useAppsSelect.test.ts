import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import { fileInfo } from 'fixtures/files.fixtures';
import { tapisApp } from 'fixtures/apps.fixtures';
import useAppsSelect from './useAppsSelect';

const file1 = { ...tapisApp, id: 'app1' };
const file2 = { ...tapisApp, id: 'app2' };
const file3 = { ...tapisApp, id: 'app3' };

describe('useAppsSelect', () => {
  it('performs single selection', async () => {
    const selectedApps = [file1];
    const setSelectedApps = jest.fn();

    const mockUseContext = jest.fn().mockImplementation(() => ({
      selectedApps,
      setSelectedApps,
    }));

    React.useContext = mockUseContext;

    const { result } = renderHook(() => useAppsSelect());
    const { select } = result.current;

    await act(async () => {
      select([file2], 'single');
    });
    expect(setSelectedApps).toHaveBeenCalledWith([file2]);
  });

  it('performs single selection of a file already selected', async () => {
    const selectedApps = [file1];
    const setSelectedApps = jest.fn();

    const mockUseContext = jest.fn().mockImplementation(() => ({
      selectedApps,
      setSelectedApps,
    }));

    React.useContext = mockUseContext;
    const { result } = renderHook(() => useAppsSelect());
    const { select } = result.current;

    await act(async () => {
      select([file1], 'single');
    });
    expect(setSelectedApps).toHaveBeenCalledWith([file1]);
  });

  it('performs multiselection', async () => {
    const selectedApps = [file1];
    const setSelectedApps = jest.fn();

    const mockUseContext = jest.fn().mockImplementation(() => ({
      selectedApps,
      setSelectedApps,
    }));

    React.useContext = mockUseContext;
    const { result } = renderHook(() => useAppsSelect());
    const { select } = result.current;

    await act(async () => {
      select([file2], 'multi');
    });
    expect(setSelectedApps).toHaveBeenCalledWith([file1, file2]);
  });

  it('performs unselection', async () => {
    const selectedApps = [file1, file2, file3];
    const setSelectedApps = jest.fn();

    const mockUseContext = jest.fn().mockImplementation(() => ({
      selectedApps,
      setSelectedApps,
    }));

    React.useContext = mockUseContext;
    const { result } = renderHook(() => useAppsSelect());
    const { unselect } = result.current;

    await act(async () => {
      unselect([file2]);
    });
    expect(setSelectedApps).toHaveBeenCalledWith([file1, file3]);
  });

  it('performs clearing', async () => {
    const selectedApps = [file1, file2];
    const setSelectedApps = jest.fn();

    const mockUseContext = jest.fn().mockImplementation(() => ({
      selectedApps,
      setSelectedApps,
    }));

    React.useContext = mockUseContext;
    const { result } = renderHook(() => useAppsSelect());
    const { clear } = result.current;

    await act(async () => {
      clear();
    });
    expect(setSelectedApps).toHaveBeenCalledWith([]);
  });
});
