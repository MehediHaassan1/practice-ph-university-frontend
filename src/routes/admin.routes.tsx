import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import Students from "../pages/admin/userManagement/Students";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import Faculty from "../pages/admin/userManagement/Faculty";
import FacultyDetails from "../pages/admin/userManagement/FacultyDetails";
import Admin from "../pages/admin/userManagement/Admin";
import AdminDetails from "../pages/admin/userManagement/AdminDetails";
import StudentUpdate from "../pages/admin/userManagement/StudentUpdate";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import RegisteredSemesters from "../pages/admin/courseManagement/RegisteredSemesters";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import OfferedCourse from "../pages/admin/courseManagement/OfferedCourse";
import Course from "../pages/admin/courseManagement/Course";

const adminItems = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        name: "Academic Management",
        children: [
            {
                name: "Create Academic Semester",
                path: "create-academic-semester",
                element: <CreateAcademicSemester />,
            },
            {
                name: "Academic Semester",
                path: "academic-semesters",
                element: <AcademicSemester />,
            },
            {
                name: "Create Academic Faculty",
                path: "create-academic-faculty",
                element: <CreateAcademicFaculty />,
            },
            {
                name: "Academic Faculty",
                path: "academic-faculty",
                element: <AcademicFaculty />,
            },
            {
                name: "Create Academic Department",
                path: "create-academic-department",
                element: <CreateAcademicDepartment />,
            },
            {
                name: "Academic Department",
                path: "academic-department",
                element: <AcademicDepartment />,
            },
        ],
    },
    {
        name: "User Management",
        children: [
            {
                name: "Create Student",
                path: "create-student",
                element: <CreateStudent />,
            },
            {
                name: "Students",
                path: "students",
                element: <Students />,
            },
            {
                path: "student/details/:id",
                element: <StudentDetails />,
            },
            {
                path: "student/update/:id",
                element: <StudentUpdate />,
            },
            {
                name: "Create Faculty",
                path: "create-faculty",
                element: <CreateFaculty />,
            },
            {
                name: "Faculties",
                path: "faculties",
                element: <Faculty />,
            },
            {
                path: "faculty/details/:id",
                element: <FacultyDetails />,
            },
            {
                name: "Create Admin",
                path: "create-admin",
                element: <CreateAdmin />,
            },
            {
                name: "Admins",
                path: "admins",
                element: <Admin />,
            },
            {
                path: "admin/details/:id",
                element: <AdminDetails />,
            },
        ],
    },
    {
        name: "Course Management",
        children: [
            {
                name: "Semester Registration",
                path: "semester-registration",
                element: <SemesterRegistration />,
            },
            {
                name: "Registered Semester",
                path: "registered-semester",
                element: <RegisteredSemesters />,
            },
            {
                name: "Create Course",
                path: "create-course",
                element: <CreateCourse />,
            },
            {
                name: "Courses",
                path: "courses",
                element: <Course />,
            },
            {
                name: "Offer Course",
                path: "offer-course",
                element: <OfferCourse />,
            },
            {
                name: "Offered Course",
                path: "offered-course",
                element: <OfferedCourse />,
            },
        ],
    },
];

export default adminItems;
