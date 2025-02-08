import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function Pagination({ table }) {
  console.log("table", table);
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <p>На странице</p>
        <Select
        //   value={String(table.getRowModel().rows.length)}
          onValueChange={(value) => table.setPageSize(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={table.getRowModel().rows.length} />
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
        Страница {table.getState().pagination.pageIndex + 1} из{" "}
        {table.getPageCount()}
      </p>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          First page
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          Last page
        </Button>
      </div>
    </div>
  );
}
