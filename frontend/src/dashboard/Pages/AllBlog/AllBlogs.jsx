import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useGetAllBlogQuery } from "../../../Features/Api/dashboard.api";

const AllBlogs = () => {
  const navigate = useNavigate();
  const { data, isloading, error } = useGetAllBlogQuery();
  // console.log(data?.data);
  const truncate = (str, n = 250) => {
    if (!str) return "";
    // Remove HTML tags first
    const textOnly = str.replace(/<[^>]+>/g, "");
    return textOnly.length > n ? textOnly.substring(0, n) + "..." : textOnly;
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Blog Title",
        Cell: ({ cell }) => (
          <span className="font-semibold text-gray-800">{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "category.name",
        header: "Category",
        Cell: ({ cell }) => (
          <span className="font-semibold text-gray-800 ">
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "image",
        header: "Blog Image",

        Cell: ({ cell }) => (
          <img
            src={cell.getValue()}
            alt="Category"
            className="w-20 h-20 bg-white rounded-sm  border border-gray-200 object-cover"
          />
        ),
      },
      {
        accessorKey: "description",
        header: "Blog Description",
        Cell: ({ cell }) => (
          <span className="text-gray-700 text-sm block">
            {truncate(cell.getValue(), 250)}
          </span>
        ),
      },
      {
        accessorKey: "_id",
        header: "Actions",
        enableShorting: false,
        Cell: ({ row }) => (
          <Box className="flex items-center justify-center gap-1">
            <Tooltip title="Edit">
              <IconButton
                size="small"
                // onClick={() => handleEdit(row.original)}
                className="text-green-600 hover:bg-green-50"
              >
                <Edit fontSize="small" className="text-blue-600" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                // onClick={() => handleDelete(row.original)}
                className="text-red-600 hover:bg-red-50"
                // disabled={isDeleting}
              >
                <Delete fontSize="small" className="text-red-600" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data?.data || [],
    enableColumnResizing: true,
    initialState: { density: "comfortable" },
    layoutMode: "fullWidth",
  });
  return (
    <div className="max-w-6xl mx-auto py-section_gap px-4">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default AllBlogs;
