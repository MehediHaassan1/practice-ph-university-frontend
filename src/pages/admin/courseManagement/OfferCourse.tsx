import { Button, Col, Row, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PhSelectWithWatch from "../../../components/form/PhSelectWithWatch";
import PHInput from "../../../components/form/PHInput";
import { useState } from "react";
import PhSelect from "../../../components/form/PhSelect";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const OfferCourse = () => {
    const [id, setId] = useState("");
    const [createOfferCourse] = courseManagementApi.useOfferCourseMutation();
    const { data: semesterRegistration, isLoading } =
        courseManagementApi.useGetAllRegisteredSemestersQuery(undefined);
    const { data: academicFaculty, isLoading: academicFacultyLoading } =
        academicManagementApi.useGetAllAcademicFacultyQuery(undefined);
    const { data: academicDepartment, isLoading: academicDepartmentLoading } =
        academicManagementApi.useGetAllDepartmentQuery(undefined);
    const { data: course, isLoading: courseLoading } =
        courseManagementApi.useGetAllCoursesQuery(undefined);

    const { data: faculties, isFetching: facultyFetching } =
        courseManagementApi.useGetAllAssignedFacultiesQuery(
            { courseId: id },
            { skip: !id }
        );

    if (
        isLoading ||
        academicFacultyLoading ||
        academicDepartmentLoading ||
        courseLoading
    )
        return <div>Loading...</div>;

    const semesterRegistrationOptions = semesterRegistration?.data?.map(
        (item) => ({
            value: item._id,
            label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        })
    );

    const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const courseOptions = course?.data?.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const facultyOptions = faculties?.data?.faculties?.map((item) => ({
        value: item._id,
        label: item.fullName,
    }));

    const daysOptions = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map(
        (item) => ({
            value: item,
            label: item,
        })
    );

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating ...");
        try {
            const courseData = {
                ...data,
                section: Number(data.section),
                maxCapacity: Number(data.maxCapacity),
            };
            const res = await createOfferCourse({ data: courseData });
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
        <Flex justify="center" align="center" style={{ padding: "20px" }}>
            <Col xs={24} sm={20} lg={16}>
                <PHForm onSubmit={onSubmit}>
                    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
                        <Col xs={24} sm={12}>
                            <PhSelect
                                name="semesterRegistration"
                                label="Semester Registration"
                                options={semesterRegistrationOptions!}
                            />
                        </Col>
                        <Col xs={24} sm={12}>
                            <PhSelect
                                name="academicFaculty"
                                label="Academic Faculty"
                                options={academicFacultyOptions!}
                            />
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
                        <Col xs={24} sm={12}>
                            <PhSelect
                                name="academicDepartment"
                                label="Academic Department"
                                options={academicDepartmentOptions!}
                            />
                        </Col>
                        <Col xs={24} sm={12}>
                            <PhSelectWithWatch
                                name="course"
                                label="Course"
                                options={courseOptions}
                                onValueChange={setId}
                            />
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
                        <Col xs={24} sm={12}>
                            <PhSelect
                                disabled={!id || facultyFetching}
                                name="faculty"
                                label="Faculty"
                                options={facultyOptions}
                            />
                        </Col>
                        <Col xs={24} sm={12}>
                            <PHInput
                                name="section"
                                label="Section"
                                type="number"
                            />
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
                        <Col xs={24} sm={12}>
                            <PHInput
                                name="maxCapacity"
                                label="Max Capacity"
                                type="number"
                            />
                        </Col>
                        <Col xs={24} sm={12}>
                            <PhSelect
                                name="days"
                                label="Days"
                                options={daysOptions}
                                mode="multiple"
                            />
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 16, sm: 16, md: 24, lg: 32 }}>
                        <Col xs={24} sm={12}>
                            <PHTimePicker name="startTime" label="Start Time" />
                        </Col>
                        <Col xs={24} sm={12}>
                            <PHTimePicker name="endTime" label="End Time" />
                        </Col>
                    </Row>
                    <Row justify="center" style={{ marginTop: "20px" }}>
                        <Col span={24}>
                            <Button htmlType="submit" block>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default OfferCourse;
