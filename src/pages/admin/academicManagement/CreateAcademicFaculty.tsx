import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schema/academicManagement.schema";

const CreateAcademicFaculty = () => {
    const [createFaculty] = academicManagementApi.useCreateFacultyMutation();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Faculty is creating...");
        const res = await createFaculty(data);
        if (res.data) {
            toast.success(res.data.message, { id: toastId });
        } else {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Row justify="center">
            <Col span={8}>
                <PHForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(academicFacultySchema)}
                >
                    <PHInput type="text" name="name" label="Name" />
                    <Button htmlType="submit">Create</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateAcademicFaculty;
