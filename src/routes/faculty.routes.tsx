import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse";

const facultyItems = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <FacultyDashboard />,
    },
    {
        name: "Offered course",
        path: "offered-course",
        element: <OfferedCourse />,
    },
];

export default facultyItems;
