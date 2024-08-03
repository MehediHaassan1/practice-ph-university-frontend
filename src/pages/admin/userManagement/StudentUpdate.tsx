import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import PHInput from "../../../components/form/PHInput";
import PhSelect from "../../../components/form/PhSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
const { Title } = Typography;

const StudentUpdate = () => {
    const { id } = useParams();
    const [updateStudent] = userManagementApi.useUpdateStudentMutation();
    const { data: studentData, isLoading: studentLoading } =
        userManagementApi.useGetSingleStudentQuery(id);

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            name: { firstName: "", middleName: "", lastName: "" },
            gender: "",
            dateOfBirth: null,
            bloogGroup: "",
            profileImg: null,
            email: "",
            contactNo: "",
            emergencyContactNo: "",
            presentAddress: "",
            permanentAddress: "",
            guardian: {
                fatherName: "",
                fatherOccupation: "",
                fatherContactNo: "",
                motherName: "",
                motherOccupation: "",
                motherContactNo: "",
            },
            localGuardian: {
                name: "",
                occupation: "",
                contactNo: "",
                address: "",
            },
            admissionSemester: "",
            academicDepartment: "",
        },
    });

    useEffect(() => {
        if (studentData) {
            const fields = [
                ["name.firstName", studentData.data.name.firstName],
                ["name.middleName", studentData.data.name.middleName],
                ["name.lastName", studentData.data.name.lastName],
                ["gender", studentData.data.gender],
                ["dateOfBirth", studentData.data.dateOfBirth],
                ["bloogGroup", studentData.data.bloogGroup],
                ["profileImg", studentData.data.profileImg],
                ["email", studentData.data.email],
                ["contactNo", studentData.data.contactNo],
                ["emergencyContactNo", studentData.data.emergencyContactNo],
                ["presentAddress", studentData.data.presentAddress],
                ["permanentAddress", studentData.data.permanentAddress],
                ["guardian.fatherName", studentData.data.guardian.fatherName],
                [
                    "guardian.fatherOccupation",
                    studentData.data.guardian.fatherOccupation,
                ],
                [
                    "guardian.fatherContactNo",
                    studentData.data.guardian.fatherContactNo,
                ],
                ["guardian.motherName", studentData.data.guardian.motherName],
                [
                    "guardian.motherOccupation",
                    studentData.data.guardian.motherOccupation,
                ],
                [
                    "guardian.motherContactNo",
                    studentData.data.guardian.motherContactNo,
                ],
                ["localGuardian.name", studentData.data.localGuardian.name],
                [
                    "localGuardian.occupation",
                    studentData.data.localGuardian.occupation,
                ],
                [
                    "localGuardian.contactNo",
                    studentData.data.localGuardian.contactNo,
                ],
                [
                    "localGuardian.address",
                    studentData.data.localGuardian.address,
                ],
                [
                    "admissionSemester",
                    studentData.data.admissionSemester?._id || "",
                ],
                [
                    "academicDepartment",
                    studentData.data.academicDepartment?._id || "",
                ],
            ];
            fields.forEach(([field, value]) => setValue(field, value));
        }
    }, [studentData, setValue]);

    type StudentFormData = {
        name: {
            firstName: string;
            middleName: string;
            lastName: string;
        };
        gender: string;
        dateOfBirth: Date | null;
        bloogGroup: string;
        profileImg: File | null;
        email: string;
        contactNo: string;
        emergencyContactNo: string;
        presentAddress: string;
        permanentAddress: string;
        guardian: {
            fatherName: string;
            fatherOccupation: string;
            fatherContactNo: string;
            motherName: string;
            motherOccupation: string;
            motherContactNo: string;
        };
        localGuardian: {
            name: string;
            occupation: string;
            contactNo: string;
            address: string;
        };
        admissionSemester: string | { value: string };
        academicDepartment: string | { value: string };
    };

    const onSubmit:SubmitHandler<StudentFormData> = async (data: StudentFormData) => {
        // console.log(data)
        const studentInfo = {
            student: {
                ...data,
                admissionSemester:
                    data.admissionSemester?.valueOf || data.admissionSemester,
                academicDepartment:
                    data.academicDepartment?.valueOf || data.academicDepartment,
            },
        };
        try {
            console.log(studentInfo)
            const res = await updateStudent({ id, studentInfo }).unwrap();
            console.log(res)
            toast.success("Student Update is Successful!", {
                position: "top-center",
            });
        } catch (error) {
            toast.error("Error updating student", { position: "top-center" });
        }
    };

    if (studentLoading) return <div>Loading...</div>;

    type InputType = {
        name: string;
        component: "input" | "select" | "datepicker" | "file";
        label?: string;
        options?: Array<{ value: string; label: string }>;
        disabled?: boolean;
    };

    const renderInputs = (inputs: InputType[]) =>
        inputs.map((input: InputType) => (
            <Col key={input.name} span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                {input.component === "input" && (
                    <PHInput
                        control={control}
                        type="text"
                        name={input.name}
                        label={input.label}
                    />
                )}
                {input.component === "select" && (
                    <PhSelect
                        options={input.options || []}
                        name={input.name}
                        label={input.label || ""}
                        disabled={input.disabled}
                    />
                )}
                {input.component === "datepicker" && (
                    <PHDatePicker name={input.name} label={input.label} />
                )}
                {input.component === "file" && (
                    <Controller
                        name={input.name}
                        render={({ field: { onChange, value, ...field } }) => (
                            <Form.Item label={input.label}>
                                <Input
                                    type="file"
                                    value={value?.fileName}
                                    {...field}
                                    onChange={(e) =>
                                        onChange(e.target.files?.[0])
                                    }
                                />
                            </Form.Item>
                        )}
                    />
                )}
            </Col>
        ));

    const personalInfo: InputType[] = [
        { component: "input", name: "name.firstName", label: "First Name" },
        { component: "input", name: "name.middleName", label: "Middle Name" },
        { component: "input", name: "name.lastName", label: "Last Name" },
        {
            component: "select",
            name: "gender",
            label: "Gender",
            options: genderOptions,
        },
        {
            component: "datepicker",
            name: "dateOfBirth",
            label: "Date Of Birth",
        },
        {
            component: "select",
            name: "bloogGroup",
            label: "Blood Group",
            options: bloodGroupOptions,
        },
        { component: "file", name: "profileImg", label: "Profile Picture" },
    ];

    const contactInfo: InputType[] = [
        { component: "input", name: "email", label: "Email" },
        { component: "input", name: "contactNo", label: "Contact No" },
        {
            component: "input",
            name: "emergencyContactNo",
            label: "Emergency Contact No",
        },
        {
            component: "input",
            name: "presentAddress",
            label: "Present Address",
        },
        {
            component: "input",
            name: "permanentAddress",
            label: "Permanent Address",
        },
    ];

    const guardianInfo: InputType[] = [
        {
            component: "input",
            name: "guardian.fatherName",
            label: "Father Name",
        },
        {
            component: "input",
            name: "guardian.fatherOccupation",
            label: "Father Occupation",
        },
        {
            component: "input",
            name: "guardian.fatherContactNo",
            label: "Father Contact No",
        },
        {
            component: "input",
            name: "guardian.motherName",
            label: "Mother Name",
        },
        {
            component: "input",
            name: "guardian.motherOccupation",
            label: "Mother Occupation",
        },
        {
            component: "input",
            name: "guardian.motherContactNo",
            label: "Mother Contact No",
        },
    ];

    const localGuardianInfo: InputType[] = [
        { component: "input", name: "localGuardian.name", label: "Name" },
        {
            component: "input",
            name: "localGuardian.occupation",
            label: "Occupation",
        },
        {
            component: "input",
            name: "localGuardian.contactNo",
            label: "Contact No",
        },
        { component: "input", name: "localGuardian.address", label: "Address" },
    ];


    return (
        <Row>
            <Col span={24}>
                <Title
                    level={2}
                    style={{ textAlign: "center", marginTop: "30px" }}
                >
                    Update Student Data
                </Title>
            </Col>
            <Col span={24}>
                <PHForm onSubmit={handleSubmit(onSubmit)}>
                    <Divider>Personal Information</Divider>
                    <Row gutter={8}>{renderInputs(personalInfo)}</Row>
                    <Divider>Contact Information</Divider>
                    <Row gutter={8}>{renderInputs(contactInfo)}</Row>
                    <Divider>Guardian Information</Divider>
                    <Row gutter={8}>{renderInputs(guardianInfo)}</Row>
                    <Divider>Local Guardian Information</Divider>
                    <Row gutter={8}>{renderInputs(localGuardianInfo)}</Row>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    )
}

export default StudentUpdate;
