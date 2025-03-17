import { HistorySchema } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const allHistoryTableColumns: ColumnDef<HistorySchema>[] = [
  {
    accessorKey: "id",
    enableSorting: false,
    enableHiding: false,
    size: 80,
    maxSize: 80,
    minSize: 80,
    enableResizing: false,
    header: "ID",
  },
  {
    accessorKey: "label",
    size: 510,
    maxSize: 510,
    minSize: 510,
    enableResizing: false,
    enableSorting: false,
    header: "Website",
    cell: ({ row }) => {
      const url = row.original.url;
      const website = String(row.getValue("label"));

      if (!url) return <></>;
      return (
        <Button
          variant="ghost"
          onClick={() => {
            chrome.tabs.create({ url: url });
          }}
          className="w-full justify-start mr-4 cursor-pointer"
          title={website}
        >
          <span className="overflow-hidden whitespace-nowrap overflow-ellipsis text-start">
            {website}
          </span>
          <MoveUpRight />
        </Button>
      );
    },
  },
  {
    accessorKey: "visits",
    size: 80,
    maxSize: 80,
    minSize: 80,
    enableResizing: false,
    header: ({ column }) => {
      return (
        <div className="flex items-center m-0">
          Page Visits
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div>{parseInt(row.getValue("visits")).toLocaleString()}</div>
    ),
  },
];
