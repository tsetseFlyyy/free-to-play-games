import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useEffect } from "react";
import { usePaginationStore } from "../store/pagination";

export function Pagination({ table }) {
  const isDisabled = table.getRowModel().rows.length < 1;
  const currentPage = table.getState().pagination.pageIndex + 1;
  const rowsSize = table.getRowModel().rows.length;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = table.getPageCount();

  const {
    pageSize: pageSizeState,
    currentPage: currentPageState,
    currentPageType,
    setPageSize,
    setCurrentPage,
  } = usePaginationStore();

  useEffect(() => {
    table.setPageSize(pageSizeState);
    table.setPageIndex(currentPageState - 1);
  }, [currentPageType]);

  useEffect(() => {
    setPageSize(pageSize, currentPageType);
    setCurrentPage(currentPage, currentPageType);
  }, [pageSize, currentPage, currentPageType]);

  return (
    <div className="container mx-auto py-8 flex justify-center items-center gap-5">
      <div className="flex items-center gap-2">
        <p>На странице</p>
        <Select
          value={String(pageSizeState)}
          onValueChange={(value) => table.setPageSize(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={rowsSize} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p>
        Страница {rowsSize !== 0 ? currentPage : 0} из {totalPages}
      </p>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.firstPage()}
          disabled={isDisabled || !table.getCanPreviousPage()}
        >
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={isDisabled || !table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
