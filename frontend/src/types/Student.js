/**
 * @typedef {Object} Student
 * @property {string} [_id] - MongoDB ObjectId
 * @property {string} studentId - Unique student identifier
 * @property {string} name - Student's full name
 * @property {string} email - Student's email address
 * @property {string} phone - Student's phone number
 * @property {string} dateOfBirth - Student's date of birth (ISO string)
 * @property {Address} address - Student's address information
 * @property {Marks} marks - Student's academic marks
 * @property {number} [totalMarks] - Total marks (auto-calculated)
 * @property {number} [percentage] - Percentage (auto-calculated)
 * @property {string} [grade] - Grade (auto-calculated)
 * @property {string} [enrollmentDate] - Enrollment date (ISO string)
 * @property {string} [createdAt] - Creation timestamp
 * @property {string} [updatedAt] - Last update timestamp
 */

/**
 * @typedef {Object} Address
 * @property {string} street - Street address
 * @property {string} city - City name
 * @property {string} state - State name
 * @property {string} zipCode - ZIP/Postal code
 */

/**
 * @typedef {Object} Marks
 * @property {number} english - English marks (0-100)
 * @property {number} maths - Mathematics marks (0-100)
 * @property {number} science - Science marks (0-100)
 */

/**
 * @typedef {Object} StudentFormData
 * @property {string} studentId - Unique student identifier
 * @property {string} name - Student's full name
 * @property {string} email - Student's email address
 * @property {string} phone - Student's phone number
 * @property {string} dateOfBirth - Student's date of birth (YYYY-MM-DD)
 * @property {Address} address - Student's address information
 * @property {Marks} marks - Student's academic marks
 */

/**
 * @typedef {Object} GradeDistribution
 * @property {string} _id - Grade (A+, A, B+, etc.)
 * @property {number} count - Number of students with this grade
 */

/**
 * @typedef {Object} AverageMarks
 * @property {number} avgEnglish - Average English marks
 * @property {number} avgMaths - Average Mathematics marks
 * @property {number} avgScience - Average Science marks
 * @property {number} avgTotal - Average total marks
 * @property {number} avgPercentage - Average percentage
 */

/**
 * @typedef {Object} StudentStats
 * @property {number} totalStudents - Total number of students
 * @property {GradeDistribution[]} gradeDistribution - Grade distribution data
 * @property {AverageMarks} averageMarks - Average marks data
 */

/**
 * @typedef {Object} StudentsResponse
 * @property {Student[]} students - Array of students
 * @property {number} totalPages - Total number of pages
 * @property {number} currentPage - Current page number
 * @property {number} total - Total number of students
 */

export {}; 