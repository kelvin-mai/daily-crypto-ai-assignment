import { useEffect, useState } from 'react';

import { useAppStore } from '../../lib/store';
import { listBooks } from '../../api/book';
import { BookDialog } from './dialog';
import { BookCard } from './card';
import { Skeleton } from '../common/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/tabs';
import { BookDocument } from '../../lib/types/api';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../common/table';
import { BookTableRow } from './table-row';
import { BookUser, ClockCircle } from '@mynaui/icons-react';
import { BookPagination } from './pagination';

type BookViewProps = {
  books: BookDocument[];
};

const CardView: React.FC<BookViewProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {books.map((b) => (
        <BookCard key={b._id} {...b} />
      ))}
    </div>
  );
};

const TableView: React.FC<BookViewProps> = ({ books }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <BookUser />
              <span>Author</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <ClockCircle />
              <span>Propress</span>
            </div>
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((b) => (
          <BookTableRow key={b._id} {...b} />
        ))}
      </TableBody>
    </Table>
  );
};

type BooksContainerProps = {};

export const BooksContainer: React.FC<BooksContainerProps> = () => {
  const {
    books,
    actions: { setBooks },
  } = useAppStore();
  const [view, setView] = useState('cards');
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
        <>
          <Tabs
            defaultValue="cards"
            value={view}
            onValueChange={(v) => setView(v)}
          >
            <TabsList>
              <TabsTrigger value="cards">Card view</TabsTrigger>
              <TabsTrigger value="table">Table view</TabsTrigger>
            </TabsList>
            <TabsContent value="cards">
              <CardView books={books.list} />
            </TabsContent>
            <TabsContent value="table">
              <TableView books={books.list} />
            </TabsContent>
          </Tabs>
          <BookPagination />
        </>
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
