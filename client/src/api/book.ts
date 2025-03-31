import { API_URL } from '../lib/utils/env';
import type {
  BookDocument,
  BooksPagination,
  BookStatistics,
} from '../lib/types/api';
import { throwIfApiError } from '../lib/utils/api';

const baseUrl = `${API_URL}/api/books`;

type ListBooksResponse = {
  books: BookDocument[];
  statistics: BookStatistics;
  meta: BooksPagination;
};

type BookResponse = {
  book: BookDocument;
};

export type BookParams = Omit<
  BookDocument,
  '_id' | 'owner' | 'createdAt' | 'updatedAt' | '__v'
>;

export const listBooks = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const request = await fetch(`${baseUrl}/?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response: ListBooksResponse = await request.json();
  throwIfApiError(request, response);
  return response;
};

export const getBook = async (id: string) => {
  const request = await fetch(`${baseUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response: BookResponse = await request.json();
  throwIfApiError(request, response);
  return response;
};

export const createBook = async (params: BookParams) => {
  const request = await fetch(`${baseUrl}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(params),
  });
  const response: BookResponse = await request.json();
  throwIfApiError(request, response);
  return response;
};

export const updateBook = async ({
  id,
  ...params
}: Partial<BookParams> & { id: string }) => {
  const request = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(params),
  });
  const response: BookResponse = await request.json();
  throwIfApiError(request, response);
  return response;
};

export const deleteBook = async (id: string) => {
  const request = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response: { message: string } = await request.json();
  throwIfApiError(request, response);
  return response;
};
