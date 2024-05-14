import { useContext } from 'react';
import { useCallback } from 'react';
import AppsContext from './AppsContext';
import { Apps } from '@tapis/tapis-typescript';

const useAppsSelect = () => {
  const { selectedApps, setSelectedApps } = useContext(AppsContext);

  const select = useCallback(
    (apps: Array<Apps.TapisApp>, mode: 'single' | 'multi') => {
      if (mode === 'single' && apps.length === 1) {
        setSelectedApps(apps);
      }

      if (mode === 'multi') {
        const selectedSet = new Set(selectedApps.map((app) => app.id));
        const newSelection = [
          ...selectedApps,
          ...apps.filter((app) => !selectedSet.has(app.id)),
        ];
        setSelectedApps(newSelection);
      }
    },
    [selectedApps, setSelectedApps]
  );

  const unselect = useCallback(
    (apps: Array<Apps.TapisApp>) => {
      const selectedSet = new Set(selectedApps.map((selected) => selected.id));
      apps.forEach((app) => selectedSet.delete(app.id ?? ''));
      const newSelection = selectedApps.filter((selected) =>
        selectedSet.has(selected.id)
      );
      setSelectedApps(newSelection);
    },
    [selectedApps, setSelectedApps]
  );

  const clear = useCallback(() => {
    setSelectedApps([]);
  }, [setSelectedApps]);

  return {
    selectedApps,
    select,
    unselect,
    clear,
  };
};

export default useAppsSelect;
