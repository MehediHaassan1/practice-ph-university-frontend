/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TAuthUser } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading("Logging in!");
        try {
            const res = await login(data).unwrap();
            const decoded = jwtDecode(res.data.accessToken) as TAuthUser;
            dispatch(setUser({ user: decoded, token: res.data.accessToken }));
            toast.success("Logged in!", { id: toastId, duration: 2000 });
            navigate(`/${decoded.role}/dashboard`);
        } catch (error: any) {
            toast.error(error.message, { id: toastId, duration: 2000 });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <PHForm onSubmit={onSubmit}>
                <PHInput type="text" name="id" label="ID" />
                <PHInput type="text" name="password" label="Password" />
                <Button htmlType="submit">Login</Button>
            </PHForm>
        </Row>
    );
};

export default Login;
