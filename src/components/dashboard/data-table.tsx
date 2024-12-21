"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableData } from "@/utils/mockdata";
import { SortableButtonProps, TableData } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";

const SortableButton = ({
  label,
  isSorted,
  onToggleSorting,
}: SortableButtonProps) => {
  return (
    <button
      className="group flex items-center justify-start gap-2 text-sm"
      onClick={onToggleSorting}
    >
      {label}
      <ChevronDown
        className={`w-4 h-4 transition-all ${
          isSorted ? "rotate-180" : "group-hover:rotate-180"
        }`}
      />
    </button>
  );
};

export const columns: ColumnDef<TableData>[] = [
  {
    id: "select",
    header: "",
    cell: ({ row }) => (
      <Checkbox
        className="rounded-[2px] border-muted-foreground"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <SortableButton
          label="Name"
          isSorted={column.getIsSorted() === "asc"}
          onToggleSorting={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => (
      <Link
        href={`/leads/${row.getValue("name")}`}
        className="capitalize text-blue-500 hover:underline"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "topic",
    header: ({ column }) => {
      return (
        <SortableButton
          label="Topic"
          isSorted={column.getIsSorted() === "asc"}
          onToggleSorting={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("topic")}</div>
    ),
  },
  {
    accessorKey: "statusReason",
    header: ({ column }) => {
      return (
        <SortableButton
          label="Status reason"
          isSorted={column.getIsSorted() === "asc"}
          onToggleSorting={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("statusReason")}</div>
    ),
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => {
      return (
        <SortableButton
          label="Created on"
          isSorted={column.getIsSorted() === "asc"}
          onToggleSorting={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("createdOn")}</div>
    ),
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center p-4">
        <div className="focus-within:border-blue-600 border-2 max-w-md h-10 w-full overflow-hidden px-1 py-4 gap-3 rounded-[4px] flex items-center">
          <Input
            placeholder="Sort, filter and search with Copilot"
            value={(table.getColumn("topic")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("topic")?.setFilterValue(event.target.value)
            }
            className="border-none h-6 rounded-none focus-visible:ring-0 focus:ring-0 focus-within:ring-0"
          />
          <Image
            src={"/ms_365_copilot.png"}
            alt="copilot logo"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
        </div>
      </div>
    </div>
  );
}
