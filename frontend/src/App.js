import React, { useState, useEffect, useCallback } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { studentAPI } from './services/api';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetail from './components/StudentDetail';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

/**
 * Tab Panel Component
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Tab content
 * @param {number} props.index - Tab index
 * @param {number} props.value - Current active tab
 */
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

/**
 * Main App Component
 */


function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [tabValue, setTabValue] = useState(0);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Data loader
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await studentAPI.getStudents({
        search: searchTerm,
        limit: 50
      });
      setStudents(response.students);
    } catch (err) {
      setError('Failed to fetch students');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  // Fetch students on component mount and when search changes
  useEffect(() => {
    if (currentView === 'list' || tabValue === 1) {
      fetchStudents();
    }
  }, [currentView, tabValue, searchTerm, fetchStudents]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
    
    switch (newValue) {
      case 0:
        setCurrentView('dashboard');
        break;
      case 1:
        setCurrentView('list');
        break;
      case 2:
        setCurrentView('add');
        break;
      default:
        break;
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      setLoading(true);
      setError('');
      await studentAPI.createStudent(studentData);
      setSuccess('Student added successfully!');
      setCurrentView('list');
      setTabValue(1);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = async (studentData) => {
    if (!selectedStudent?._id) return;
    
    try {
      setLoading(true);
      setError('');
      await studentAPI.updateStudent(selectedStudent._id, studentData);
      setSuccess('Student updated successfully!');
      setCurrentView('list');
      setTabValue(1);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      setLoading(true);
      setError('');
      await studentAPI.deleteStudent(id);
      setSuccess('Student deleted successfully!');
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setCurrentView('view');
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setCurrentView('edit');
    setTabValue(2);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCancel = () => {
    setSelectedStudent(null);
    setCurrentView('list');
    setTabValue(1);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setCurrentView('list');
    setTabValue(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Records Management System
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 2 }}>
          {/* Navigation Tabs */}
          {currentView !== 'view' && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="main navigation">
                <Tab 
                  icon={<DashboardIcon />} 
                  label="Dashboard" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<PeopleIcon />} 
                  label="Students" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<AddIcon />} 
                  label={currentView === 'edit' ? 'Edit Student' : 'Add Student'} 
                  iconPosition="start"
                />
              </Tabs>
            </Box>
          )}

          {/* Main Content */}
          {currentView === 'view' ? (
            <StudentDetail
              student={selectedStudent}
              onEdit={() => handleEditClick(selectedStudent)}
              onBack={handleBackToList}
            />
          ) : (
            <>
              <TabPanel value={tabValue} index={0}>
                <Dashboard />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <StudentList
                  students={students}
                  loading={loading}
                  totalRows={students.length}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteStudent}
                  onView={handleViewStudent}
                  onAdd={() => {
                    setCurrentView('add');
                    setTabValue(2);
                    setSelectedStudent(null);
                  }}
                  onSearch={handleSearch}
                  error={error}
                />
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <StudentForm
                  initialData={selectedStudent ? {
                    studentId: selectedStudent.studentId,
                    name: selectedStudent.name,
                    email: selectedStudent.email,
                    phone: selectedStudent.phone,
                    dateOfBirth: selectedStudent.dateOfBirth.split('T')[0], // Format for input
                    address: selectedStudent.address,
                    marks: selectedStudent.marks
                  } : undefined}
                  onSubmit={currentView === 'edit' ? handleEditStudent : handleAddStudent}
                  onCancel={handleCancel}
                  isLoading={loading}
                  error={error}
                  title={currentView === 'edit' ? 'Edit Student' : 'Add New Student'}
                />
              </TabPanel>
            </>
          )}
        </Container>

        {/* Success/Error Snackbars */}
        <Snackbar
          open={!!success}
          autoHideDuration={4000}
          onClose={() => setSuccess('')}
        >
          <Alert onClose={() => setSuccess('')} severity="success">
            {success}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert onClose={() => setError('')} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App; 