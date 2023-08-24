import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

export const currentLocationAtom = atom<string>('');

export function useCurrentLocationAtom() {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  const resetAtom = useCallback(() => {
    setCurrentLocation('');
  }, []);

  return {
    resetAtom,

    currentLocation,
    setCurrentLocation,
  };
}
