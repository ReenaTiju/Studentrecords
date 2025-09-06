# Student Records Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing student records with comprehensive features including student information management, academic performance tracking, and statistical analysis.

## 🚀 Features

### Backend Features
- **RESTful API** with Express.js and Node.js
- **MongoDB** database with Mongoose ODM
- **Data Validation** using express-validator
- **CRUD Operations** for student management
- **Search and Filtering** capabilities
- **Statistical Analysis** with aggregation pipelines
- **Error Handling** and logging
- **Auto-calculation** of total marks, percentage, and grades

### Frontend Features
- **Modern React** with TypeScript
- **Material-UI** for beautiful and responsive design
- **Form Validation** using React Hook Form and Yup
- **Data Grid** with sorting, filtering, and pagination
- **Dashboard** with statistics and charts
- **Real-time Search** functionality
- **Responsive Design** for mobile and desktop
- **Student Detail Views** with comprehensive information display

### Student Data Management
- Personal information (ID, name, contact details)
- Address information (street, city, state, zip code)
- Academic marks (English, Mathematics, Science)
- Auto-calculated total marks, percentage, and grades
- Enrollment and update timestamps

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Studentrecords
```

### 2. Install Dependencies

#### Install root dependencies (for concurrent development)
```bash
npm install
```

#### Install backend dependencies
```bash
cd backend
npm install
```

#### Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 3. Environment Setup

#### Backend Configuration
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studentrecords
NODE_ENV=development
```

#### Frontend Configuration
Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will create the database automatically

#### Option 2: MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string
4. Update `MONGODB_URI` in backend `.env` file

## 🚀 Running the Application

### Development Mode

#### Option 1: Run Both Frontend and Backend Concurrently (Recommended)
```bash
# From the root directory
npm run dev
```

#### Option 2: Run Separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Production Mode

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Backend
```bash
cd backend
npm start
```

## 📚 API Endpoints

### Students
- `GET /api/students` - Get all students (with pagination, search, sorting)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/stats` - Get student statistics

### Health Check
- `GET /api/health` - API health check

## 🗃️ Database Schema

### Student Model
```javascript
{
  studentId: String (required, unique),
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  dateOfBirth: Date (required),
  address: {
    street: String (required),
    city: String (required),
    state: String (required),
    zipCode: String (required)
  },
  marks: {
    english: Number (0-100, required),
    maths: Number (0-100, required),
    science: Number (0-100, required)
  },
  totalMarks: Number (auto-calculated),
  percentage: Number (auto-calculated),
  grade: String (auto-calculated: A+, A, B+, B, C, D, F),
  enrollmentDate: Date (default: now),
  timestamps: true
}
```

## 🎨 UI Components

### Dashboard
- Student statistics overview
- Grade distribution charts
- Subject-wise performance analysis
- Key performance indicators

### Student List
- Data grid with sorting and filtering
- Search functionality
- Bulk operations
- Export capabilities

### Student Form
- Comprehensive form validation
- Real-time error feedback
- Responsive design
- Auto-save functionality

### Student Detail View
- Complete student profile
- Academic performance visualization
- Contact and address information
- Action buttons for editing

## 🔧 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Material-UI** - Component library
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **Axios** - HTTP client
- **MUI X Data Grid** - Advanced data table

## 🧪 Testing the Application

### Sample Student Data
You can test the application with this sample data:

```json
{
  "studentId": "STU001",
  "name": "John Doe",
  "email": "john.doe@email.com",
  "phone": "+1234567890",
  "dateOfBirth": "2000-05-15",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "marks": {
    "english": 85,
    "maths": 92,
    "science": 78
  }
}
```

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify network connectivity for MongoDB Atlas

#### Port Already in Use
- Change the PORT in backend `.env` file
- Kill existing processes using the port

#### CORS Issues
- Verify frontend URL in CORS configuration
- Check API_URL in frontend `.env`

#### Module Not Found Errors
- Run `npm install` in respective directories
- Clear node_modules and reinstall dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please contact [your-email@example.com] or create an issue in the repository.

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- MongoDB for the flexible database solution
- React community for the amazing ecosystem
- All contributors and testers

---

**Happy Coding! 🎉** 