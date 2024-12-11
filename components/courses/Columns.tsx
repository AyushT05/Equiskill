"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";


import { Button } from "../ui/button";
import EditButton from "../ui/EditButton";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title", // course.title
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    },

  {
    accessorKey: "isPublished",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/instructor/courses/${row.original.id}/basic`}
        className="flex gap-2 items-center hover:text-[#003cb3]"
      >
        <EditButton />
      </Link>
    ),
  },
];