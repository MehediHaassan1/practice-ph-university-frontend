/* 
{
    "password": "admin123",
    "admin": {
        "designation":"Admin",
        "name": {
            "firstName": "Mr. Mezbaul",
            "middleName": "Abedin",
            "lastName": "Forhan"
        },
        "gender": "male",
        "dateOfBirth": "1998-04-24",
        "email": "mezbaul@programming-hero.com",
        "contactNo": "123567",
        "emergencyContactNo": "987-654-3210",
        "bloogGroup": "A+",
        "presentAddress": "123 Main St, Cityville",
        "permanentAddress": "456 Oak St, Townsville",
        "profileImg": "path/to/profile/image.jpg"
    }
}
*/

import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PhSelect from "../../../components/form/PhSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const CreateAdmin = () => {
    const [createAdmin] = userManagementApi.useCreateAdminMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Admin is creating");
        const adminData = {
            password: "admin123",
            admin: {
                designation: "Admin",
                ...data,
            },
        };
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(adminData));
            formData.append("file", data.profileImg);
            const res = await createAdmin(formData);
            if (res.data) {
                toast.success(res?.data?.message, { id: toastId });
            } else {
                toast.error(res?.error?.data?.message, { id: toastId });
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <Row justify="center">
            <Col span={24}>
                <PHForm onSubmit={onSubmit}>
                    <Divider>Personal Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="name.firstName"
                                label="First Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="name.middleName"
                                label="Middle Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="name.lastName"
                                label="Last Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PhSelect
                                options={genderOptions}
                                name="gender"
                                label="Gender"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHDatePicker
                                name="dateOfBirth"
                                label="Date of birth"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PhSelect
                                options={bloodGroupOptions}
                                name="bloogGroup"
                                label="Blood group"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Controller
                                name="profileImg"
                                render={({
                                    field: { onChange, value, ...field },
                                }) => (
                                    <Form.Item label="Picture">
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
                        </Col>
                    </Row>
                    <Divider>Contact Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="email" label="Email" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="contactNo"
                                label="Contact"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="emergencyContactNo"
                                label="Emergency Contact"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="presentAddress"
                                label="Present Address"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="permanentAddress"
                                label="Permanent Address"
                            />
                        </Col>
                    </Row>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateAdmin;
