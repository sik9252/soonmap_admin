import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

export const selectedAccountAtom = atom<{
  id?: number;
  name?: string;
  email?: string;
  admin?: boolean;
  manager?: boolean;
  staff?: boolean;
  ban?: boolean;
  createAt?: string;
}>({});

export function useSelectedAccountAtom() {
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);

  const resetAtom = useCallback(() => {
    setSelectedAccount({});
  }, []);

  return {
    resetAtom,

    selectedAccount,
    setSelectedAccount,
  };
}
