import { Link } from "react-router-dom";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { Button, Pagination, Table } from "antd";
import { toast } from "sonner";
import { useState } from "react";

const Faculty = () => {
    const [page, setPage] = useState(1);
    const { data: facultyData, isLoading } =
        userManagementApi.useGetAllFacultyQuery([
            { name: "limit", value: 3 },
            { name: "page", value: page },
            { name: "sort", value: "id" },
        ]);
    const [blockUser] = userManagementApi.useBlockUserMutation();

    if (isLoading) return <div>Loading...</div>;
    const metaData = facultyData?.meta;

    // -------------- Actions start --------------- //
    const handleUpdate = (facultyId: string) => {
        console.log("Clicked on update", facultyId);
    };

    const handleBlock = async (facultyId: string) => {
        const info = {
            id: facultyId,
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

    const handleUnblock = async (facultyId: string) => {
        const info = {
            id: facultyId,
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

    const tableData = facultyData?.data?.map(
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
            key: "facultyName",
            title: "Faculty Name",
            dataIndex: "fullName",
        },
        {
            key: "facultyID",
            title: "Faculty ID",
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
                            to={`/admin/faculty/details/${record.key}`}
                            style={{ marginRight: "20px" }}
                        >
                            Details
                        </Link>
                        <Button
                            onClick={() => handleUpdate(record.id)}
                            style={{ marginRight: "20px" }}
                        >
                            Update
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

export default Faculty;
