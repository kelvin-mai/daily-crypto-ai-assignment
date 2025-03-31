import {
  ChevronLeft,
  ChevronRight,
  Dots,
  DotsVertical,
} from '@mynaui/icons-react';

import { listBooks } from '../../api/book';
import { useAppStore } from '../../lib/store';
import { Button } from '../common/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../common/dropdown';

const btnClass = `shadow border border-slate-200 hover:bg-slate-200 transition-colors dark:hover:bg-slate-700`;

export const BookPagination = () => {
  const {
    books: { pagination },
    actions: { setBooks },
  } = useAppStore();

  if (!pagination) return null;

  const { currentPage, pageSize, pages, total } = pagination;

  const loadBooks = async (params: { limit?: number; page?: number }) => {
    setBooks({ loading: true });
    const data = await listBooks({
      limit: params.limit || pageSize,
      page: params.page || currentPage,
    });
    setBooks({
      loading: false,
      list: data?.books || [],
      statistics: data?.statistics,
      pagination: data?.meta,
    });
  };

  const handlePrev = () => {
    loadBooks({ page: currentPage - 1 });
  };
  const handleNext = () => {
    loadBooks({ page: currentPage + 1 });
  };
  const handlePage = (page: number) => {
    loadBooks({ page });
  };
  const handlePageSize = (size: number) => {
    loadBooks({ limit: size, page: 1 });
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="mx-auto flex w-full justify-center gap-1 my-4"
    >
      <Button
        className={btnClass}
        onClick={handlePrev}
        disabled={currentPage <= 1}
      >
        <ChevronLeft />
        <span>Previous</span>
      </Button>
      {currentPage >= 3 && (
        <Button disabled={true}>
          <Dots />
        </Button>
      )}
      {currentPage >= 2 && (
        <Button
          onClick={() => handlePage(currentPage - 1)}
          className={btnClass}
        >
          {currentPage - 1}
        </Button>
      )}
      <Button className={btnClass} disabled={true}>
        {currentPage}
      </Button>
      {currentPage < pages - 1 && (
        <Button
          className={btnClass}
          onClick={() => handlePage(currentPage + 1)}
        >
          {currentPage + 1}
        </Button>
      )}
      {pages - currentPage >= 2 && (
        <Button disabled={true}>
          <Dots />
        </Button>
      )}
      {currentPage !== pages && (
        <Button className={btnClass} onClick={() => handlePage(pages)}>
          {pages}
        </Button>
      )}
      <Button
        className={btnClass}
        onClick={handleNext}
        disabled={currentPage >= pages}
      >
        <span>Next</span>
        <ChevronRight />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={btnClass}>
            <DotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{total} Total Books</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Select Page Size</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[5, 10, 25].map((n) => (
            <DropdownMenuItem key={n} onClick={() => handlePageSize(n)}>
              {n}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
