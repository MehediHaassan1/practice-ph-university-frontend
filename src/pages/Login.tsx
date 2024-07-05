/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TAuthUser } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="id">ID : </label>
                <input type="text" id="id" {...register("id")} />
            </div>
            <div>
                <label htmlFor="password">Password : </label>
                <input type="text" id="password" {...register("password")} />
            </div>
            <Button htmlType="submit">Login</Button>
        </form>
    );
};

export default Login;
