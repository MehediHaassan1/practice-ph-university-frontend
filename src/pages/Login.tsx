import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const [login, { data, error }] = useLoginMutation();

    const onSubmit = async (data) => {
        const res = await login(data).unwrap();
        const decoded = jwtDecode(res.data.accessToken);
        dispatch(setUser({ user: decoded, token: res.data.accessToken }));
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
