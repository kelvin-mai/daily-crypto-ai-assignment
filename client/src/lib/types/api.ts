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
} & Document;

export type BooksPagination = {
  currentPage: number;
  pageSize: number;
  pages: number;
  total: number;
};
