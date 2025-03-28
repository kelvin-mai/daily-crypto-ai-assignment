import { create } from 'zustand';
import { AuthUser, UserDocument } from '../types/api';

type AppStore = {
  initialized: boolean;
  user?: UserDocument | AuthUser;
  actions: {
    setInitialized(v: boolean): void;
    setUser(user?: UserDocument | AuthUser): void;
  };
};

export const useAppStore = create<AppStore>((set) => ({
  initialized: false,
  user: undefined,
  actions: {
    setInitialized: (v: boolean) => {
      set({ initialized: v });
    },
    setUser: (user: UserDocument | AuthUser | undefined) => {
      set({ user });
    },
  },
}));

// export const useAppActions = () => useAppStore((state) => state.actions);
