import React, { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { allHistoryTableColumns } from "./adapters";
import { HistorySchema, TIME_PERIOD } from "@/types";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHistory } from "@/hooks/history";
import { Loader } from "../Loader";

export function AllHistoryTable() {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const [timePeriod, setTimePeriod] = useState<TIME_PERIOD>(TIME_PERIOD.MONTH);
  const [timeDuration, setTimeDuration] = useState<number>(12);

  const { data, isPending } = useHistory(timePeriod, timeDuration);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = allHistoryTableColumns;

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between w-full">
        <Input
          placeholder="Search..."
          value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("label")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          defaultValue="all"
          onValueChange={(value) => {
            switch (value) {
              case "week":
                setTimePeriod(TIME_PERIOD.WEEK);
                setTimeDuration(1);
                break;
              case "month":
                setTimePeriod(TIME_PERIOD.MONTH);
                setTimeDuration(1);
                break;
              case "all":
                setTimePeriod(TIME_PERIOD.MONTH);
                setTimeDuration(12);
                break;
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="all" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-[370px]">
          <Loader size="large" />
        </div>
      ) : (
        <>
          <div
            ref={tableContainerRef}
            style={{
              overflow: "auto",
              position: "relative",
              height: "370px",
            }}
            className="rounded-md border w-full text-sm"
          >
            <table style={{ display: "grid" }}>
              <TableHeader
                style={{
                  display: "grid",
                  position: "sticky",
                  top: 0,
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                    className="bg-card hover:bg-card"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          style={{
                            display: "flex",
                            width: header.getSize(),
                            alignItems: "center",
                          }}
                        >
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody
                style={{
                  display: "grid",
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const row = rows[virtualRow.index] as Row<HistorySchema>;
                  return (
                    <TableRow
                      data-index={virtualRow.index}
                      ref={(node) => rowVirtualizer.measureElement(node)}
                      key={row.id}
                      style={{
                        display: "flex",
                        position: "absolute",
                        transform: `translateY(${virtualRow.start}px)`,
                        width: "100%",
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell
                            key={cell.id}
                            style={{
                              display: "flex",
                              width: cell.column.getSize(),
                              alignItems: "center",
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </table>
          </div>
          <div className="flex w-full mt-2 justify-end">
            <span className="font-medium text-muted-foreground text-sm mr-2">
              {rows.length.toLocaleString()} rows
            </span>
          </div>
        </>
      )}
    </div>
  );
}
