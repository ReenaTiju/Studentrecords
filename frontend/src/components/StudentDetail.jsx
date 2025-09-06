import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  Avatar,
  Button
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { getGradeColor, formatDate, calculateAge } from '../utils/validation';

/**
 * Student Detail View Component
 * @param {Object} props
 * @param {Object} props.student - Student data
 * @param {Function} props.onEdit - Edit handler
 * @param {Function} props.onBack - Back handler
 */
const StudentDetail = ({ student, onEdit, onBack }) => {
  /**
   * Info Card Component
   * @param {Object} props
   * @param {string} props.title - Card title
   * @param {React.ReactNode} props.icon - Card icon
   * @param {React.ReactNode} props.children - Card content
   */
  const InfoCard = ({ title, icon, children }) => (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  /**
   * Info Row Component
   * @param {Object} props
   * @param {string} props.label - Label text
   * @param {string|number} props.value - Value text
   */
  const InfoRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2" fontWeight="medium">
        {value}
      </Typography>
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{ mr: 2 }}
          >
            Back to List
          </Button>
          <Typography variant="h4" component="h1">
            Student Details
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEdit}
          size="large"
        >
          Edit Student
        </Button>
      </Box>

      {/* Student Profile Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom>
            {student.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Student ID: {student.studentId}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label={`Grade: ${student.grade}`}
              sx={{
                backgroundColor: getGradeColor(student.grade || 'F'),
                color: 'white',
                fontWeight: 'bold'
              }}
            />
            <Chip
              label={`${student.percentage}%`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`Age: ${calculateAge(student.dateOfBirth)}`}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <InfoCard title="Personal Information" icon={<PersonIcon color="primary" />}>
            <InfoRow label="Full Name" value={student.name} />
            <InfoRow label="Student ID" value={student.studentId} />
            <InfoRow label="Date of Birth" value={formatDate(student.dateOfBirth)} />
            <InfoRow label="Age" value={`${calculateAge(student.dateOfBirth)} years`} />
            <InfoRow label="Enrollment Date" value={formatDate(student.enrollmentDate || '')} />
          </InfoCard>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <InfoCard title="Contact Information" icon={<EmailIcon color="primary" />}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">{student.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">{student.phone}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
              <LocationIcon sx={{ mr: 1, fontSize: 20, mt: 0.5 }} />
              <Box>
                <Typography variant="body2">{student.address.street}</Typography>
                <Typography variant="body2">
                  {student.address.city}, {student.address.state} {student.address.zipCode}
                </Typography>
              </Box>
            </Box>
          </InfoCard>
        </Grid>

        {/* Academic Performance */}
        <Grid item xs={12} md={8}>
          <InfoCard title="Academic Performance" icon={<SchoolIcon color="primary" />}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {student.marks.english}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    English
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.50', borderRadius: 1 }}>
                  <Typography variant="h4" color="secondary" fontWeight="bold">
                    {student.marks.maths}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mathematics
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {student.marks.science}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Science
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    {student.totalMarks}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total (300)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="h3" fontWeight="bold" color="text.primary">
                    {student.percentage}%
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Overall Percentage
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography 
                    variant="h3" 
                    fontWeight="bold"
                    sx={{ color: getGradeColor(student.grade || 'F') }}
                  >
                    {student.grade}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Final Grade
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <InfoCard title="Quick Stats" icon={<SchoolIcon color="primary" />}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Class Rank
              </Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (Not calculated)
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <InfoRow label="Created" value={formatDate(student.createdAt || '')} />
            <InfoRow label="Last Updated" value={formatDate(student.updatedAt || '')} />
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
              <Typography variant="body2" color="info.main" fontWeight="medium" gutterBottom>
                Performance Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.percentage && student.percentage >= 90 ? 'Excellent performance!' :
                 student.percentage && student.percentage >= 80 ? 'Very good performance!' :
                 student.percentage && student.percentage >= 70 ? 'Good performance!' :
                 student.percentage && student.percentage >= 60 ? 'Satisfactory performance.' :
                 'Needs improvement.'}
              </Typography>
            </Box>
          </InfoCard>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentDetail; 