import { type AuthParams, getProfile, login, register } from '../../api/auth';
import {
  type BookParams,
  createBook,
  deleteBook,
  listBooks,
} from '../../api/book';
import { AppState, Setter } from './state';
import { AppActions } from './actions';

export type AppEffects = {
  initialize: () => Promise<void>;
  authenticate: (
    mode: 'register' | 'login',
    params: AuthParams,
  ) => Promise<void>;
  logout: () => void;
  setTheme: (v: boolean) => void;
  createBookAndRefetch: (params: BookParams) => Promise<void>;
  deleteBookAndRefetch: (id: string) => Promise<void>;
};

type Getter = () => AppState & {
  actions: AppActions;
};

export const createEffects = (set: Setter, get: Getter): AppEffects => ({
  initialize: async () => {
    const { setUser, setTheme, setInitialized } = get().actions;
    try {
      if (localStorage.getItem('token')) {
        const profile = await getProfile();
        setUser(profile);
      }
      const root = window.document.documentElement;
      const systemTheme = localStorage.getItem('vite-ui-theme');
      if (systemTheme) {
        setTheme(localStorage.getItem('vite-ui-theme') as 'light' | 'dark');
        root.classList.add(systemTheme);
      } else {
        localStorage.setItem('vite-ui-theme', 'light');
        setTheme('light');
      }
    } catch (e) {
      localStorage.removeItem('token');
      throw e;
    } finally {
      setInitialized(true);
    }
  },
  authenticate: async (mode, params) => {
    const { setUser } = get().actions;
    try {
      const action = mode === 'register' ? register : login;
      const response = await action(params);
      localStorage.setItem('token', response?.token);
      const profile = await getProfile();
      setUser(profile);
    } catch (e) {
      localStorage.removeItem('token');
      throw e;
    }
  },
  logout: () => {
    set({ user: undefined, books: { loading: false } });
    localStorage.removeItem('token');
  },
  setTheme: (v) => {
    const { setTheme } = get().actions;
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (v) {
      setTheme('dark');
      root.classList.add('dark');
      localStorage.setItem('vite-ui-theme', 'dark');
    } else {
      setTheme('light');
      root.classList.add('light');
      localStorage.setItem('vite-ui-theme', 'light');
    }
  },
  createBookAndRefetch: async (params) => {
    const {
      selectedPageSize,
      actions: { setBooks },
    } = get();
    await createBook(params);
    setBooks({ loading: true });
    const response = await listBooks({ limit: selectedPageSize });
    setBooks({
      loading: false,
      list: response?.books,
      pagination: response?.meta,
    });
  },
  deleteBookAndRefetch: async (id) => {
    const {
      selectedPageSize,
      actions: { setBooks },
    } = get();
    setBooks({ loading: true });
    await deleteBook(id);
    const response = await listBooks({ limit: selectedPageSize });
    setBooks({
      loading: false,
      list: response?.books,
      pagination: response?.meta,
    });
  },
});
