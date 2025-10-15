import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import {
  useGetAllCategoryQuery,
  useGetDeleteCategoryMutation,
} from "../../../Features/Api/blog.Api";
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

const AllCategories = () => {
  const { data, error, isLoading } = useGetAllCategoryQuery();
  const [deleteCategory, { isLoading: isDeleting }] =
    useGetDeleteCategoryMutation();
  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Category Name",
        size: 200,
        Cell: ({ cell }) => (
          <span className="font-semibold text-gray-800">{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "image",
        header: "Category Image",
        size: 150,
        Cell: ({ cell }) => (
          <img
            src={cell.getValue()[0]}
            alt="Category"
            className="w-14 h-14 bg-white rounded-sm p-2 border border-gray-200 object-cover"
          />
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 300,
        Cell: ({ cell }) => (
          <span className="text-gray-600 line-clamp-2">
            {cell.getValue() || "No description"}
          </span>
        ),
      },
      {
        accessorKey: "_id",
        header: "Actions",
        size: 150,
        enableSorting: false,
        Cell: ({ row }) => (
          <Box className="flex items-center justify-center gap-1">
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => handleEdit(row.original)}
                className="text-green-600 hover:bg-green-50"
              >
                <Edit fontSize="small" className="text-blue-600" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => handleDelete(row.original)}
                className="text-red-600 hover:bg-red-50"
                disabled={isDeleting}
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

  const handleEdit = (category) => {
    console.log("Edit category:", category);
    // Implement edit logic
  };

  const handleDelete = async (category) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(category._id).unwrap();
        toast.success("Category deleted successfully");
      } catch (err) {
        // console.error("Failed to delete the category: ", err);
        toast.error("Failed to delete the category");
      }
    }
  };
  useEffect(() => {}, [deleteCategory]);

  // Table configuration
  const table = useMaterialReactTable({
    columns,
    data: data?.data || [],
    enableColumnOrdering: true,
    enablePagination: true,
    enableSorting: true,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    initialState: {
      density: "compact",
    },
    muiTablePaperProps: {
      elevation: 0,
      className: "shadow-lg border border-gray-200",
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#f8fafc",
        fontWeight: "600",
        color: "#374151",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderRight: "1px solid #e5e7eb",
      },
    },
    renderTopToolbarCustomActions: () => (
      <h2 className="text-2xl font-semibold text-gray-800 px-4">
        All Categories
      </h2>
    ),
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-section_gap flex justify-center items-center min-h-64">
        <CircularProgress />
        <span className="ml-4 text-gray-600">Loading categories...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-section_gap">
        <Alert severity="error" className="mb-4">
          Error loading categories: {error?.data?.message || "Unknown error"}
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-section_gap px-4">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default AllCategories;
