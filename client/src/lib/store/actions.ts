import { AuthUser, BookDocument, UserDocument } from '../types/api';
import { AppState, BooksState } from './state';

export type AppActions = {
  setInitialized(v: boolean): void;
  setTheme(v: 'light' | 'dark'): void;
  setUser(user?: UserDocument | AuthUser): void;
  setBooks(books: BooksState): void;
  setBook(book: BookDocument): void;
  setSelectedPageSize(n: number): void;
};

export const createActions = (set: any): AppActions => ({
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
    set((state: AppState) => ({
      ...state,
      books: {
        ...state.books,
        list: state.books.list?.map((b) => (b._id === book._id ? book : b)),
      },
    })),
  setSelectedPageSize: (n) => {
    set({ selectedPageSize: n });
  },
});
