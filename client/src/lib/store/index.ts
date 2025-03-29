import { create } from 'zustand';
import {
  AuthUser,
  BookDocument,
  BooksPagination,
  UserDocument,
} from '../types/api';

type BooksState =
  | { loading: boolean }
  | { loading: false; list: BookDocument[]; pagination: BooksPagination };

type AppStore = {
  initialized: boolean;
  user?: UserDocument | AuthUser;
  books: {
    loading: boolean;
    list?: BookDocument[];
    pagination?: BooksPagination;
  };
  actions: {
    setInitialized(v: boolean): void;
    setUser(user?: UserDocument | AuthUser): void;
    setBooks(books: BooksState): void;
  };
};

export const useAppStore = create<AppStore>((set) => ({
  initialized: false,
  user: undefined,
  books: {
    loading: false,
  },
  actions: {
    setInitialized: (v: boolean) => {
      set({ initialized: v });
    },
    setUser: (user: UserDocument | AuthUser | undefined) => {
      set({ user });
    },
    setBooks: (booksState) => {
      set({ books: booksState });
    },
  },
}));

// export const useAppActions = () => useAppStore((state) => state.actions);
