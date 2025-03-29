import { useEffect } from 'react';
import { useAppStore } from '../../lib/store';
import { listBooks } from '../../api/book';
import { BookDialog } from './dialog';

type BooksContainerProps = {};

export const BooksContainer: React.FC<BooksContainerProps> = () => {
  const {
    books,
    actions: { setBooks },
  } = useAppStore();
  console.log('book state', books);
  const loadBooks = async () => {
    setBooks({ loading: true });
    const data = await listBooks({});
    console.log('loadbooks data', data);
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
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-500 p-4 rounded-lg shadow-md text-white">
          <h4>ASDF</h4>
          <p>ASDF</p>
          <p>progress</p>
          <p>Update Progress</p>
        </div>
        {/* {books.list &&
          books.list.length > 0 &&
          books.list?.map((b) => <div>{b.title}</div>)} */}
      </div>
    </div>
  );
};
