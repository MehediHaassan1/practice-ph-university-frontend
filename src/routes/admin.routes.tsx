import AcademicDepartment from "../pages/admin/academicDepartment/AcademicDepartment";
import CreateAcademicDepartment from "../pages/admin/academicDepartment/CreateAcademicDepartment";
import AcademicFaculty from "../pages/admin/academicFaculty/AcademicFaculty";
import CreateAcademicFaculty from "../pages/admin/academicFaculty/CreateAcademicFaculty";
import AcademicSemester from "../pages/admin/academicSemester/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicSemester/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

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
                name: "Create Admin",
                path: "create-admin",
                element: <CreateAdmin />,
            },
            {
                name: "Create Faculty",
                path: "create-faculty",
                element: <CreateFaculty />,
            },
            {
                name: "Create Student",
                path: "create-student",
                element: <CreateStudent />,
            },
        ],
    },
];

export default adminItems;
