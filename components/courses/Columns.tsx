"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import { ArrowUpDown } from "lucide-react";


import { Button } from "../ui/button";
import EditButton from "../ui/EditButton";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title", // course.title
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(price);

      return <div>{formatted}</div>;
    },
    },

  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge
          className={`${ 
            isPublished && "bg-[#003cb3] text-white hover:bg-[#cce6ff] hover:text-black"
          }`}
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/instructor/courses/${row.original.id}/basic`}
        className="flex gap-2 items-center ml-5">
        <EditButton className="ml-6" />
      </Link>
    ),
  },
];