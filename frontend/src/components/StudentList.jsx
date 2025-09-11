import React, { useState, useCallback } from 'react';
import './StudentList.css'; // Add this import
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  InputAdornment
} from '@mui/material';
import {
  DataGrid,
  GridToolbar
} from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { getGradeColor, formatDate, calculateAge } from '../utils/validation';

/**
 * Student List Component with DataGrid
 * @param {Object} props
 * @param {Array} props.students - Array of students
 * @param {boolean} [props.loading] - Loading state
 * @param {number} [props.totalRows] - Total number of students
 * @param {Function} props.onEdit - Edit student handler
 * @param {Function} props.onDelete - Delete student handler
 * @param {Function} props.onView - View student handler
 * @param {Function} props.onAdd - Add student handler
 * @param {Function} props.onSearch - Search handler
 * @param {string} [props.error] - Error message
 */
const StudentList = ({
  students,
  loading = false,
  totalRows = 0,
  onEdit,
  onDelete,
  onView,
  onAdd,
  onSearch,
  error
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleSearchChange = useCallback((event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  }, [onSearch]);

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (studentToDelete?._id) {
      setDeleteLoading(true);
      try {
        await onDelete(studentToDelete._id);
        setDeleteDialogOpen(false);
        setStudentToDelete(null);
      } catch (error) {
        console.error('Delete error:', error);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const columns = [
    {
      field: 'studentId',
      headerName: 'Student ID',
      width: 120,
      pinned: 'left'
    },
    {
      field: 'name',
      headerName: 'Full Name',
      width: 200,
      pinned: 'left'
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 80,
      valueGetter: (value, row) => {
        return row && row.dateOfBirth ? calculateAge(row.dateOfBirth) : 'N/A';
      }
    },
    {
      field: 'city',
      headerName: 'City',
      width: 120,
      valueGetter: (value, row) => {
        return row && row.address ? row.address.city || 'N/A' : 'N/A';
      }
    },
    {
      field: 'totalMarks',
      headerName: 'Total Marks',
      width: 120,
      type: 'number',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          {params.value || 0}/300
        </Typography>
      )
    },
    {
      field: 'percentage',
      headerName: 'Percentage',
      width: 120,
      type: 'number',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          {params.value || 0}%
        </Typography>
      )
    },
    {
      field: 'grade',
      headerName: 'Grade',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value || 'N/A'}
          size="small"
          sx={{
            backgroundColor: getGradeColor(params.value || 'F'),
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      )
    },
    {
      field: 'enrollmentDate',
      headerName: 'Enrollment',
      width: 120,
      valueFormatter: (value) => value ? formatDate(value) : 'N/A'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        if (!params.row) return null;
        
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onView(params.row)}
              title="View Details"
            >
              <ViewIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onEdit(params.row)}
              title="Edit Student"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(params.row)}
              title="Delete Student"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      }
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Student Records ({totalRows})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
          size="large"
        >
          Add Student
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by name, student ID, email, or city..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Data Grid */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={students || []}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }
            }
          }}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }}
          getRowId={(row) => row?._id || row?.id || Math.random()}
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete student "{studentToDelete?.name}" 
            (ID: {studentToDelete?.studentId})? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StudentList; 