/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../types/global.types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = (await changePassword(data)) as TResponse<any>;
            if (res?.error) {
                toast.error(res?.error?.data?.message);
            } else {
                navigate("/login");
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <PHForm onSubmit={onSubmit}>
                <PHInput type="text" name="oldPassword" label="Old Password" />
                <PHInput type="text" name="newPassword" label="New Password" />
                <Button htmlType="submit">Change Password</Button>
            </PHForm>
        </Row>
    );
};

export default ChangePassword;
