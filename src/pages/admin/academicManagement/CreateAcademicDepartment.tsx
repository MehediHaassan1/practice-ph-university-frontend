import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhSelect from "../../../components/form/PhSelect";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schema/academicManagement.schema";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
    const { data: academicFaculty, isLoading } =
        academicManagementApi.useGetAllFacultyQuery(undefined);

    const [createDepartment] =
        academicManagementApi.useCreateDepartmentMutation();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const academicFacultyOptions = academicFaculty?.data?.map(
        (item: { _id: string; name: string }) => ({
            value: item._id,
            label: item.name,
        })
    );

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Academic Department is creating");
        const res = await createDepartment(data);
        if (res.data) {
            toast.success(res?.data?.message, { id: toastId });
        } else {
            toast.error(res?.error?.data?.message, {id: toastId});
        }
        console.log(res);
    };

    return (
        <Row justify={"center"}>
            <Col span={8}>
                <PHForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(academicDepartmentSchema)}
                >
                    <PHInput type="text" name="name" label="Name" />
                    <PhSelect
                        name="academicFaculty"
                        label="Academic Faculty"
                        options={academicFacultyOptions}
                    />
                    <Button htmlType="submit">Create</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateAcademicDepartment;
