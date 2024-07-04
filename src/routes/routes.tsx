import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import App from "../App";
import { generateRoutes } from "../utils/generateRoutes";
import adminItems from "./admin.routes";
import facultyItems from "./faculty.routes";
import studentItems from "./student.routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
    //* admin routes
    {
        path: "/admin",
        element: <App />,
        children: generateRoutes(adminItems),
    },

    //* faculty routes
    {
        path: "/faculty",
        element: <App />,
        children: generateRoutes(facultyItems),
    },

    //* student routes
    {
        path: "/student",
        element: <App />,
        children: generateRoutes(studentItems),
    },
]);

export default router;
