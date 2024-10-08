import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

// export type TTableData = Pick<
//     TAcademicSemester,
//     "name" | "year" | "startMonth" | "endMonth"
// >;

const Students = () => {
    const [page, setPage] = useState(1);
    const { data: studentData, isLoading: studentLoading } =
        userManagementApi.useGetAllStudentQuery([
            { name: "limit", value: 3 },
            { name: "page", value: page },
            { name: "sort", value: "id" },
        ]);

    const metaData = studentData?.meta;

    const [blockUser] = userManagementApi.useBlockUserMutation();

    if (studentLoading) return <div> Loading ...</div>;

    // -------------- Actions start --------------- //
    const handleUpdate = (studentId: string) => {
        console.log("Clicked on update", studentId);
    };

    const handleBlock = async (studentId: string) => {
        const info = {
            id: studentId,
            data: { status: "blocked" },
        };
        try {
            const res = await blockUser(info);
            if (res.data) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnblock = async (studentId: string) => {
        const info = {
            id: studentId,
            data: { status: "in-progress" },
        };
        try {
            const res = await blockUser(info);
            if (res.data) {
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // -------------- Actions end --------------- //

    const tableData = studentData?.data?.map(
        ({
            _id,
            fullName,
            id,
            user: { status, _id: userId },
        }: {
            _id: string;
            fullName: string;
            id: string;
            user: { status: string; _id: string };
        }) => {
            return {
                key: _id,
                fullName,
                id,
                status,
                userId,
            };
        }
    );

    const columns = [
        {
            key: "studentName",
            title: "Student Name",
            dataIndex: "fullName",
        },
        {
            key: "studentRoll",
            title: "Student Roll",
            dataIndex: "id",
        },
        {
            key: "x",
            title: "Actions",
            render: (record: {
                key: string;
                fullName: string;
                id: string;
                status: string;
                userId: string;
            }) => {
                return (
                    <div>
                        <Link
                            to={`/admin/student/details/${record.key}`}
                            style={{ marginRight: "20px" }}
                        >
                            Details
                        </Link>
                        <Button
                            onClick={() => handleUpdate(record.id)}
                            style={{ marginRight: "20px" }}
                        >
                            <Link to={`/admin/student/update/${record.key}`}>
                                Update
                            </Link>
                        </Button>
                        {record?.status === "in-progress" ? (
                            <Button
                                onClick={() => handleBlock(record.userId)}
                                style={{ marginRight: "20px" }}
                            >
                                Block
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleUnblock(record.userId)}
                                style={{ marginRight: "20px" }}
                            >
                                unblock
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={tableData}
                showSorterTooltip={{ target: "sorter-icon" }}
                pagination={false}
            />
            <Pagination
                total={metaData?.total}
                pageSize={metaData?.limit}
                current={page}
                onChange={(value) => setPage(value)}
            />
        </>
    );
};

export default Students;
