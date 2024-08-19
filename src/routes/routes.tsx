import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import App from "../App";
import { generateRoutes } from "../utils/generateRoutes";
import adminItems from "./admin.routes";
import facultyItems from "./faculty.routes";
import studentItems from "./student.routes";
import Login from "../pages/Login";
import ProtectedRoute from "../components/layout/ProtectedRoute";

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
        element: (
            <ProtectedRoute role="admin">
                <App />
            </ProtectedRoute>
        ),
        children: generateRoutes(adminItems),
    },

    //* faculty routes
    {
        path: "/faculty",
        element: (
            <ProtectedRoute role="faculty">
                <App />
            </ProtectedRoute>
        ),
        children: generateRoutes(facultyItems),
    },

    //* student routes
    {
        path: "/student",
        element: (
            <ProtectedRoute role="student">
                <App />
            </ProtectedRoute>
        ),
        children: generateRoutes(studentItems),
    },

    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;
