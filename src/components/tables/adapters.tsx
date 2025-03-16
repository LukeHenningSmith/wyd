import { HistorySchema } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const allHistoryTableColumns: ColumnDef<HistorySchema>[] = [
  {
    accessorKey: "id",
    enableSorting: false,
    enableHiding: false,
    size: 100, //10
    maxSize: 100, //10
    minSize: 100, //10
    enableResizing: false,
    header: "ID",
  },
  {
    accessorKey: "label",
    size: 700, //70%
    maxSize: 700, //70%
    minSize: 700, //70%
    enableResizing: false,
    header: "Website",
    cell: ({ row }) => {
      const url = String(row.getValue("url"));
      const website = String(row.getValue("label"));

      if (!url) return <></>;
      return (
        <Button
          variant="ghost"
          onClick={() => {
            chrome.tabs.create({ url: url });
          }}
          className="overflow-hidden whitespace-nowrap overflow-ellipsis"
          title={website}
        >
          {website}
          <MoveUpRight />
        </Button>
      );
    },
  },
  {
    accessorKey: "visits",
    size: 200, //20%
    maxSize: 200, //20%
    minSize: 200, //20%
    enableResizing: false,
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center m-0">
          Page Visits
          <Button
            variant="ghost"
            className="m-0"
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
