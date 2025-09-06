const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    zipCode: {
      type: String,
      required: true,
      trim: true
    }
  },
  marks: {
    english: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    maths: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    science: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  totalMarks: {
    type: Number,
    default: function() {
      return this.marks.english + this.marks.maths + this.marks.science;
    }
  },
  percentage: {
    type: Number,
    default: function() {
      const total = this.marks.english + this.marks.maths + this.marks.science;
      return Math.round((total / 300) * 100 * 100) / 100; // Round to 2 decimal places
    }
  },
  grade: {
    type: String,
    default: function() {
      const percentage = Math.round(((this.marks.english + this.marks.maths + this.marks.science) / 300) * 100 * 100) / 100;
      if (percentage >= 90) return 'A+';
      if (percentage >= 80) return 'A';
      if (percentage >= 70) return 'B+';
      if (percentage >= 60) return 'B';
      if (percentage >= 50) return 'C';
      if (percentage >= 40) return 'D';
      return 'F';
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate total marks, percentage, and grade
studentSchema.pre('save', function(next) {
  this.totalMarks = this.marks.english + this.marks.maths + this.marks.science;
  this.percentage = Math.round((this.totalMarks / 300) * 100 * 100) / 100;
  
  if (this.percentage >= 90) this.grade = 'A+';
  else if (this.percentage >= 80) this.grade = 'A';
  else if (this.percentage >= 70) this.grade = 'B+';
  else if (this.percentage >= 60) this.grade = 'B';
  else if (this.percentage >= 50) this.grade = 'C';
  else if (this.percentage >= 40) this.grade = 'D';
  else this.grade = 'F';
  
  next();
});

module.exports = mongoose.model('Student', studentSchema); 