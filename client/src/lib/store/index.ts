import { create } from 'zustand';
import {
  AuthUser,
  BookDocument,
  BooksPagination,
  BookStatistics,
  UserDocument,
} from '../types/api';

type BooksState =
  | {
      loading: boolean;
      statistics?: BookStatistics;
      list?: BookDocument[];
      pagination?: BooksPagination;
    }
  | {
      loading: false;
      statistics: BookStatistics;
      list: BookDocument[];
      pagination: BooksPagination;
    };

type AppStore = {
  initialized: boolean;
  theme: 'light' | 'dark';
  user?: UserDocument | AuthUser;
  books: BooksState;
  actions: {
    setInitialized(v: boolean): void;
    setTheme(v: 'light' | 'dark'): void;
    setUser(user?: UserDocument | AuthUser): void;
    setBooks(books: BooksState): void;
    setBook(book: BookDocument): void;
    logout(): void;
  };
};

export const useAppStore = create<AppStore>((set) => ({
  initialized: false,
  theme: 'light',
  user: undefined,
  books: {
    loading: false,
  },
  actions: {
    setInitialized: (v: boolean) => {
      set({ initialized: v });
    },
    setTheme: (v: 'light' | 'dark') => {
      set({ theme: v });
    },
    setUser: (user: UserDocument | AuthUser | undefined) => {
      set({ user });
    },
    setBooks: (booksState) => {
      set({ books: booksState });
    },
    setBook: (book) =>
      set((state) => ({
        ...state,
        books: {
          ...state.books,
          list: state.books.list?.map((b) => (b._id === book._id ? book : b)),
        },
      })),
    logout: () => {
      set({ user: undefined, books: { loading: false } });
    },
  },
}));

// export const useAppActions = () => useAppStore((state) => state.actions);
