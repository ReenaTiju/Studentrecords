const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats
} = require('../controllers/studentController');
const { validateStudent } = require('../middleware/validation');

// @route   GET /api/students
// @desc    Get all students with pagination, search, and sorting
// @access  Public
router.get('/', getAllStudents);

// @route   GET /api/students/stats
// @desc    Get student statistics
// @access  Public
router.get('/stats', getStudentStats);

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Public
router.get('/:id', getStudentById);

// @route   POST /api/students
// @desc    Create new student
// @access  Public
router.post('/', validateStudent, createStudent);

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Public
router.put('/:id', validateStudent, updateStudent);

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Public
router.delete('/:id', deleteStudent);

module.exports = router; 