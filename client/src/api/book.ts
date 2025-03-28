import { API_URL } from '../lib/utils/env';
import { BookDocument } from '../lib/types/api';

const baseUrl = `${API_URL}/api/books`;

type ListBooksResponse = {
  books: BookDocument[];
  meta: {
    currentPage: number;
    pageSize: number;
    pages: number;
    total: number;
  };
};

type BookParams = {
  title: string;
  author: string;
};

export const listBooks = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const request = await fetch(`${baseUrl}/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response: ListBooksResponse = await request.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getBook = async (id: string) => {
  try {
    const request = await fetch(`${baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response: BookDocument = await request.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const createBook = async (params: BookParams) => {
  try {
    const request = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(params),
    });
    const response: BookDocument = await request.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateBook = async ({
  id,
  ...params
}: Partial<BookParams> & { id: string }) => {
  try {
    const request = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(params),
    });
    const response: BookDocument = await request.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteBook = async (id: string) => {
  try {
    const request = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response: { message: string } = await request.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
