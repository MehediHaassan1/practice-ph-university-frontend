import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, TAuthUser } from "../../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({
    children,
    role,
}: {
    children: ReactNode;
    role: string | undefined;
}) => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);

    let user;
    if (token) {
        user = jwtDecode(token) as TAuthUser;
    }
    
    if (role !== undefined && role !== user?.role) {
        dispatch(logout());
        return <Navigate to="/login" replace={true} />;
    }

    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;
