import { Link } from "react-router-dom";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { Button, Table } from "antd";
import { toast } from "sonner";

const Faculty = () => {
    const { data: facultyData, isLoading } =
        userManagementApi.useGetAllFacultyQuery(undefined);
    const [blockUser] = userManagementApi.useBlockUserMutation();

    if (isLoading) return <div>Loading...</div>;

    console.log(facultyData);

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
        <Table
            columns={columns}
            dataSource={tableData}
            showSorterTooltip={{ target: "sorter-icon" }}
        />
    );
};

export default Faculty;
