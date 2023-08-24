import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

export const selectedBuildingAtom = atom<{
  id?: number;
  name?: string;
  floorsUp?: number;
  floorsDown?: number;
  description?: string;
  latitude?: number;
  longitude?: number;
  uniqueNumber?: string;
}>({});

export function useSelectedBuildingAtom() {
  const [selectedBuilding, setSelectedBuilding] = useAtom(selectedBuildingAtom);

  const resetBuildingAtom = useCallback(() => {
    setSelectedBuilding({});
  }, []);

  return {
    resetBuildingAtom,

    selectedBuilding,
    setSelectedBuilding,
  };
}
