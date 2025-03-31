import { create } from 'zustand';

import { AppState, initialState } from './state';
import { AppActions, createActions } from './actions';
import { AppEffects, createEffects } from './effects';

type AppStore = AppState & {
  actions: AppActions;
  effects: AppEffects;
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,
  actions: createActions(set),
  effects: createEffects(set, get),
}));

export const useAppActions = () => useAppStore((state) => state.actions);
export const useAppEffects = () => useAppStore((state) => state.effects);
