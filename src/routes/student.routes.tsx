import StudentDashboard from "../pages/student/StudentDashboard";
import StudentProfile from "../pages/student/StudentProfile";

const studentItems = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <StudentDashboard />,
    },
    {
        name: "Profile",
        path: "profile",
        element: <StudentProfile />,
    },
];

export default studentItems;
