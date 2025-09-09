import * as yup from 'yup';

export const studentValidationSchema = yup.object({
  studentId: yup
    .string()
    .required('Student ID is required')
    .min(3, 'Student ID must be at least 3 characters')
    .max(20, 'Student ID must be at most 20 characters'),
  
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{0,15}$/, 'Please enter a valid phone number'),
  
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .test('age', 'Age must be between 5 and 100 years', function(value) {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 5 && age - 1 <= 100;
      }
      return age >= 5 && age <= 100;
    }),
  
  address: yup.object({
    street: yup.string().required('Street address is required'),
    city: yup
      .string()
      .required('City is required')
      .matches(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces'),
    state: yup
      .string()
      .required('State is required')
      .matches(/^[a-zA-Z\s]+$/, 'State can only contain letters and spaces'),
    zipCode: yup
      .string()
      .required('Zip code is required')
      .matches(/^\d{5,10}$/, 'Zip code must be between 5 and 10 digits')
  }),
  
  marks: yup.object({
    english: yup
      .number()
      .required('English marks are required')
      .min(0, 'Marks cannot be negative')
      .max(100, 'Marks cannot exceed 100')
      .integer('Marks must be a whole number'),
    maths: yup
      .number()
      .required('Maths marks are required')
      .min(0, 'Marks cannot be negative')
      .max(100, 'Marks cannot exceed 100')
      .integer('Marks must be a whole number'),
    science: yup
      .number()
      .required('Science marks are required')
      .min(0, 'Marks cannot be negative')
      .max(100, 'Marks cannot exceed 100')
      .integer('Marks must be a whole number')
  })
});

/**
 * Get color for grade badge
 * @param {string} grade - Grade (A+, A, B+, etc.)
 * @returns {string} Color hex code
 */
export const getGradeColor = (grade) => {
  switch (grade) {
    case 'A+': return '#4caf50'; // Green
    case 'A': return '#8bc34a';  // Light Green
    case 'B+': return '#cddc39'; // Lime
    case 'B': return '#ffeb3b';  // Yellow
    case 'C': return '#ff9800';  // Orange
    case 'D': return '#ff5722';  // Deep Orange
    case 'F': return '#f44336';  // Red
    default: return '#9e9e9e';   // Grey
  }
};

/**
 * Format date string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Calculate age from date of birth
 * @param {string} dateOfBirth - Date of birth (ISO string)
 * @returns {number} Age in years
 */
export const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}; 