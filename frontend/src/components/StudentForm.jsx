import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentValidationSchema } from '../utils/validation';

/**
 * Student Form Component
 * @param {Object} props
 * @param {Object} [props.initialData] - Initial form data for editing
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Function} props.onCancel - Cancel button handler
 * @param {boolean} [props.isLoading] - Loading state
 * @param {string} [props.error] - Error message
 * @param {string} props.title - Form title
 */
const StudentForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  error,
  title
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(studentValidationSchema),
    defaultValues: initialData || {
      studentId: '',
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      marks: {
        english: 0,
        maths: 0,
        science: 0
      }
    }
  });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      if (!initialData) {
        reset(); // Reset form only for new student creation
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {title}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="studentId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Student ID"
                  error={!!errors.studentId}
                  helperText={errors.studentId?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone Number"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          {/* Address Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Address Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="address.street"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Street Address"
                  error={!!errors.address?.street}
                  helperText={errors.address?.street?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="address.state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State"
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="address.zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Zip Code"
                  error={!!errors.address?.zipCode}
                  helperText={errors.address?.zipCode?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          {/* Academic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Academic Marks (out of 100)
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="marks.english"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="English"
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                  error={!!errors.marks?.english}
                  helperText={errors.marks?.english?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="marks.maths"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mathematics"
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                  error={!!errors.marks?.maths}
                  helperText={errors.marks?.maths?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="marks.science"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Science"
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                  error={!!errors.marks?.science}
                  helperText={errors.marks?.science?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={isLoading}
                size="large"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                size="large"
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? 'Saving...' : 'Save Student'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default StudentForm; 