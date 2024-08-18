/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
    const [createCourse] = courseManagementApi.useCreateCourseMutation();
    const { data: courses, isLoading } =
        courseManagementApi.useGetAllCoursesQuery(undefined);

    if (isLoading) return <div>Loading...</div>;

    console.log(courses)

    const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating ...");
        try {
            const courseData = {
                title: data.title,
                prefix: data.prefix,
                code: Number(data.code),
                credits: Number(data.credits),
                isDeleted: false,
                preRequisiteCourses: data?.preRequisiteCourses?.map((item) => ({
                    course: item,
                    isDeleted: false,
                })),
            };
            const res = await createCourse(courseData);
            if (res.error) {
                toast.error(res?.error?.data?.message, { id: toastId });
            } else {
                toast.success(res?.data?.message, { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHForm onSubmit={onSubmit}>
                    <PHInput name="title" label="Title" type="text" />
                    <PHInput name="prefix" label="Prefix" type="text" />
                    <PHInput name="code" label="Code" type="text" />
                    <PHInput name="credits" label="Credits" type="text" />
                    <PhSelect
                        name="preRequisiteCourses"
                        label="Prerequisite Courses"
                        options={preRequisiteCoursesOptions}
                        mode="multiple"
                    />

                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateCourse;
