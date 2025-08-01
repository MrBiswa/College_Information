# Lab Testing & Calibration Management System

A comprehensive web application for managing lab testing and sample processing workflows, built with React (Frontend) and NestJS (Backend).

## Features

### Core Functionality
- **Sample Management**: Submit, track, and manage test samples from client submission to completion
- **Employee Assignment**: Assign samples to qualified employees based on testing categories and workload
- **Test Templates**: Master sheet system with predefined test parameters and customizable report templates
- **Report Generation**: Generate professional test reports based on templates and test results
- **Dashboard**: Overview of system status, pending samples, and employee workload

### Technical Features
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Database Integration**: PostgreSQL with TypeORM for robust data management
- **Responsive UI**: Modern Material-UI components with responsive design
- **API Documentation**: RESTful API endpoints for all functionality

## Technology Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **TypeORM**: Object-Relational Mapping with PostgreSQL
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Class Validator**: Input validation

### Frontend
- **React 18**: Modern React with TypeScript
- **Material-UI (MUI)**: Component library for professional UI
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **Context API**: State management

## Project Structure

```
/workspace
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── entities/       # Database entities
│   │   ├── modules/        # Feature modules
│   │   │   ├── auth/       # Authentication
│   │   │   ├── samples/    # Sample management
│   │   │   ├── users/      # Employee management
│   │   │   ├── test-templates/ # Master templates
│   │   │   └── reports/    # Report generation
│   │   ├── config/         # Configuration files
│   │   └── main.ts         # Application entry point
│   ├── package.json
│   └── .env
└── frontend/               # React Frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── contexts/       # React contexts
    │   ├── pages/          # Page components
    │   └── App.tsx         # Main application
    ├── package.json
    └── .env
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup
1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE lab_testing_db;
```

2. Update database credentials in `backend/.env` if needed:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=lab_testing_db
```

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

### Default Login Credentials
- **Email**: admin@labtesting.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user profile

### Samples
- `GET /samples` - List all samples with filters
- `POST /samples` - Create new sample
- `GET /samples/:id` - Get sample details
- `PATCH /samples/:id` - Update sample
- `PATCH /samples/:id/assign/:employeeId` - Assign employee to sample
- `GET /samples/employee-workload` - Get employee workload overview

### Users/Employees
- `GET /users` - List users with filters
- `GET /users/employees` - List active employees
- `GET /users/:id` - Get user details
- `PATCH /users/:id` - Update user

### Test Templates
- `GET /test-templates` - List test templates
- `POST /test-templates` - Create test template
- `GET /test-templates/:id` - Get template details
- `GET /test-templates/by-product/:category` - Get templates by product category

### Reports
- `GET /reports` - List reports with filters
- `POST /reports/create/:sampleId/:preparedById` - Create report
- `GET /reports/:id` - Get report details
- `PATCH /reports/:id/status` - Update report status

## Key Features Explained

### Sample Workflow
1. **Client Submission**: Clients submit samples with product details and testing requirements
2. **Sample Assignment**: Admin assigns samples to qualified employees based on testing categories
3. **Testing Process**: Employees conduct tests according to selected templates
4. **Report Generation**: Generate professional reports based on test results
5. **Review & Approval**: Reports go through review and approval workflow

### Master Templates System
- **Predefined Templates**: Default templates for common product categories (Electrical, Mechanical, Toys, Leather)
- **Customizable Parameters**: Each template contains test parameters with acceptable limits
- **Compliance Standards**: Templates reference relevant ISO/IEC standards
- **Equipment Requirements**: Specify required testing equipment for each test

### Employee Management
- **Testing Categories**: Employees are assigned specific testing categories they can handle
- **Workload Tracking**: System tracks current workload and assignment history
- **Qualification Management**: Store employee qualifications and experience

### Report System
- **Template-Based Generation**: Reports generated based on selected test templates
- **Multiple Formats**: Support for various report formats per Indian compliance guidelines
- **Review Workflow**: Draft → Review → Approval → Published workflow
- **Version Control**: Track report versions and changes

## Development Features

### Default Data
The application automatically creates:
- Default admin user
- Sample test templates for common products
- Testing categories and compliance standards

### Database Schema
- **Users**: Employee and admin management
- **Samples**: Test sample tracking
- **TestTemplates**: Master test templates
- **Reports**: Generated test reports

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization

## Future Enhancements

1. **Advanced Reporting**: PDF generation, email notifications
2. **Equipment Management**: Track testing equipment and calibration
3. **Client Portal**: Allow clients to submit samples and track progress
4. **Audit Trail**: Complete audit log of all system changes
5. **Integration**: Connect with LIMS systems and external databases
6. **Mobile App**: Mobile application for field employees

## Support

For technical support or questions about the system, please refer to the API documentation or contact the development team.

## License

This project is developed for lab testing and calibration management purposes. All rights reserved.