import {
  AuthUser,
  BookDocument,
  BooksPagination,
  BookStatistics,
  UserDocument,
} from '../types/api';

export type BooksState =
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

export type AppState = {
  initialized: boolean;
  theme: 'light' | 'dark';
  user?: UserDocument | AuthUser;
  selectedPageSize: number;
  books: BooksState;
};

export const initialState: AppState = {
  initialized: false,
  theme: 'light',
  selectedPageSize: 10,
  books: {
    loading: true,
  },
};

export type Setter = (
  partial:
    | AppState
    | Partial<AppState>
    | ((state: AppState) => AppState | Partial<AppState>),
  replace?: false,
) => void;
