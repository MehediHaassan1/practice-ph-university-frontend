/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Modal,
    Table,
    TableColumnsType,
} from "antd";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PhSelect from "../../../components/form/PhSelect";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

export type TTableData = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
};

const Course = () => {
    const { data: coursesData, isLoading } =
        courseManagementApi.useGetAllCoursesQuery(undefined);

    if (isLoading) return <div>Loading...</div>;
    console.log(coursesData);
    const tableData = coursesData?.data?.map(
        ({
            _id,
            title,
            prefix,
            code,
            credits,
        }: {
            _id: string;
            title: string;
            prefix: string;
            code: number;
            credits: number;
        }) => {
            return {
                key: _id,
                title,
                prefix,
                code,
                credits,
            };
        }
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Prefix",
            dataIndex: "prefix",
        },
        {
            title: "Code",
            dataIndex: "code",
        },
        {
            title: "Credits",
            dataIndex: "credits",
        },
        {
            title: "Action",
            key: "action",
            render: (item) => {
                return <AssignFacultiesModal facultyInfo={item} />;
            },
        },
    ];

    return <Table columns={columns} dataSource={tableData} />;
};

const AssignFacultiesModal = ({ facultyInfo }: { facultyInfo: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: faculties, isLoading } =
        userManagementApi.useGetAllFacultyQuery(undefined);

    const [assignFaculties] = courseManagementApi.useAssignFacultiesMutation();

    if (isLoading) return <div>Loading...</div>;

    const facultiesOptions = faculties?.data?.map((item: any) => {
        return {
            value: item._id,
            label: item.fullName,
        };
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (data: any) => {
        const toastId = toast.loading("Creating ...");
        try {
            const assignFacultyData = {
                courseId: facultyInfo.key,
                data,
            };
            const res = await assignFaculties(assignFacultyData);
            if (res.error) {
                toast.error(res?.error?.data?.message, { id: toastId });
            } else {
                toast.success(res?.data?.message, { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal} style={{ fontWeight: "bold" }}>
                Assign Faculties
            </Button>
            <Modal
                title="Assign Faculties"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <PHForm onSubmit={handleSubmit}>
                    <PhSelect
                        options={facultiesOptions}
                        name="faculties"
                        label="Faculties"
                        mode="multiple"
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    );
};

export default Course;
