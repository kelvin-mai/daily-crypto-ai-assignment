import { useEffect } from 'react';

import { useAppStore } from '../../lib/store';
import { listBooks } from '../../api/book';
import { BookDialog } from './dialog';
import { BookCard } from './card';
import { Skeleton } from '../common/skeleton';

type BooksContainerProps = {};

export const BooksContainer: React.FC<BooksContainerProps> = () => {
  const {
    books,
    actions: { setBooks },
  } = useAppStore();
  const loadBooks = async () => {
    setBooks({ loading: true });
    const data = await listBooks({});
    setBooks({
      loading: false,
      list: data?.books || [],
      pagination: data?.meta,
    });
  };
  useEffect(() => {
    loadBooks();
  }, []);
  return (
    <div>
      <BookDialog action="create" />
      {books.loading && (
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      )}
      {books.list && books.list.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {books.list?.map((b) => (
            <BookCard key={b._id} {...b} />
          ))}
        </div>
      )}
      {!books.loading && books.list && books.list.length === 0 && (
        <div className="p-8 rounded-lg shadow-md w-full h-64 flex justify-center items-center">
          <h4 className="text-xl">
            You're collection currently does not have any books, please add some
            books to continue to use the platform.
          </h4>
        </div>
      )}
    </div>
  );
};
