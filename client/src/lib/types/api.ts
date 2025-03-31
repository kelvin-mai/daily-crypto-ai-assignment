export type ApiError = {
  message: string;
};

export type AuthUser = {
  email: string;
  id: string;
  name: string;
};

type Document = {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type UserDocument = {
  email: string;
  name: string;
} & Document;

export type BookDocument = {
  title: string;
  author: string;
  owner: string;
  totalPages: number;
  pagesRead: number;
} & Document;

export type BookStatistics = {
  completed: number;
  total: number;
  totalPages: number;
  totalPagesRead: number;
};

export type BooksPagination = {
  currentPage: number;
  pageSize: number;
  pages: number;
  total: number;
};
