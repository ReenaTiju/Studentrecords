import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { studentAPI } from '../services/api';
import { getGradeColor } from '../utils/validation';

/**
 * Dashboard Component with Statistics
 */
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await studentAPI.getStats();
      setStats(data);
    } catch (err) {
      setError('Failed to load statistics');
      console.error('Stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Stat Card Component
   * @param {Object} props
   * @param {string} props.title - Card title
   * @param {string|number} props.value - Main value
   * @param {React.ReactNode} props.icon - Icon element
   * @param {string} props.color - Theme color
   * @param {string} [props.subtitle] - Optional subtitle
   */
  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ color, mr: 2 }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!stats) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No statistics available
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <h1>Hello</h1>
      
      <Grid container spacing={3}>
        {/* Key Statistics */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<PeopleIcon sx={{ fontSize: 40 }} />}
            color="primary.main"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Average Marks"
            value={`${Math.round(stats.averageMarks?.avgTotal || 0)}/300`}
            icon={<AssessmentIcon sx={{ fontSize: 40 }} />}
            color="secondary.main"
            subtitle={`${Math.round(stats.averageMarks?.avgPercentage || 0)}%`}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="English Avg"
            value={Math.round(stats.averageMarks?.avgEnglish || 0)}
            icon={<SchoolIcon sx={{ fontSize: 40 }} />}
            color="success.main"
            subtitle="out of 100"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Overall Performance"
            value={`${Math.round(stats.averageMarks?.avgPercentage || 0)}%`}
            icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
            color="warning.main"
            subtitle="Class Average"
          />
        </Grid>

        {/* Subject-wise Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Subject-wise Average Performance
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">English</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {Math.round(stats.averageMarks?.avgEnglish || 0)}/100
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 8 }}>
                  <Box
                    sx={{
                      width: `${stats.averageMarks?.avgEnglish || 0}%`,
                      bgcolor: 'primary.main',
                      height: '100%',
                      borderRadius: 1,
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Mathematics</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {Math.round(stats.averageMarks?.avgMaths || 0)}/100
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 8 }}>
                  <Box
                    sx={{
                      width: `${stats.averageMarks?.avgMaths || 0}%`,
                      bgcolor: 'secondary.main',
                      height: '100%',
                      borderRadius: 1,
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Science</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {Math.round(stats.averageMarks?.avgScience || 0)}/100
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 8 }}>
                  <Box
                    sx={{
                      width: `${stats.averageMarks?.avgScience || 0}%`,
                      bgcolor: 'success.main',
                      height: '100%',
                      borderRadius: 1,
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Grade Distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Grade Distribution
            </Typography>
            <Box sx={{ mt: 3 }}>
              {stats.gradeDistribution.length > 0 ? (
                stats.gradeDistribution.map((grade) => (
                  <Box key={grade._id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: 1,
                            backgroundColor: getGradeColor(grade._id),
                            mr: 2
                          }}
                        />
                        <Typography variant="body1">Grade {grade._id}</Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="bold">
                        {grade.count} students
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 6 }}>
                      <Box
                        sx={{
                          width: `${(grade.count / stats.totalStudents) * 100}%`,
                          bgcolor: getGradeColor(grade._id),
                          height: '100%',
                          borderRadius: 1,
                          transition: 'width 1s ease-in-out'
                        }}
                      />
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No grade data available
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 