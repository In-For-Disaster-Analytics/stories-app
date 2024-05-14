import { Apps } from '@tapis/tapis-typescript';

export type AppsContextType = {
  selectedApps: Array<Apps.TapisApp>;
  setSelectedApps: (selectedApps: Array<Apps.TapisApp>) => void;
};

export { default as AppsContext } from './AppsContext';
export { default as AppsProvider } from './AppProvider';
export { default as useAppsSelect } from './useAppsSelect';
