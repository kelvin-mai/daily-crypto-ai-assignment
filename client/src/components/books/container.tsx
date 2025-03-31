import { useEffect, useState } from 'react';
import { BookUser, ClockCircle, PlusSolid } from '@mynaui/icons-react';

import { listBooks } from '../../api/book';
import type { BookDocument } from '../../lib/types/api';
import { useAppStore } from '../../lib/store';
import { Skeleton } from '../common/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/tabs';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../common/table';
import { BookCard } from './card';
import { BookTableRow } from './table-row';
import { BookPagination } from './pagination';
import { BookStatistics } from './statistics';
import { BookFormDialog } from './form';

type BookViewProps = {
  books: BookDocument[];
};

const CardView: React.FC<BookViewProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

export const BooksContainer = () => {
  const {
    books,
    actions: { setBooks },
  } = useAppStore();
  const [view, setView] = useState('cards');
  const loadBooks = async () => {
    setBooks({ loading: true });
    const data = await listBooks();
    setBooks({
      loading: false,
      list: data?.books || [],
      statistics: data?.statistics,
      pagination: data?.meta,
    });
  };
  useEffect(() => {
    loadBooks();
  }, []);
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-8">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-500">
            Book Tracker Dashboard
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Track your reading progress across all your books
          </p>
        </div>
        <BookFormDialog
          mode="create"
          className="bg-teal-500 text-white text-xl"
        >
          <>
            <PlusSolid className="h-8 w-8" />
            <span>Create</span>
          </>
        </BookFormDialog>
      </div>
      {books.loading && (
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      )}
      <BookStatistics />
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
        <div className="mt-4 p-8 rounded-lg shadow-md w-full h-64 flex justify-center items-center dark:bg-slate-700">
          <h4 className="text-xl">
            You're collection currently does not have any books, please add some
            books to continue to use the platform.
          </h4>
        </div>
      )}
    </div>
  );
};
