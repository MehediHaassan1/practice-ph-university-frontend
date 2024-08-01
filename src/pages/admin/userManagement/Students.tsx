import { Button, Table, TableColumnsType, TableProps } from "antd";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

// export type TTableData = Pick<
//     TAcademicSemester,
//     "name" | "year" | "startMonth" | "endMonth"
// >;

const Students = () => {
    const { data: studentData, isLoading: studentLoading } =
        userManagementApi.useGetAllStudentQuery(undefined);

    if (studentLoading) return <div> Loading ...</div>;

    // -------------- Actions start --------------- //
    const handleUpdate = (studentId: string) => {
        console.log("Clicked on update", studentId);
    };

    const handleBlock = (studentId: string) => {
        console.log("Clicked on block", studentId);
    };

    // -------------- Actions end --------------- //

    const tableData = studentData?.data?.map(
        ({
            _id,
            fullName,
            id,
        }: {
            _id: string;
            fullName: string;
            id: string;
        }) => {
            return {
                key: _id,
                fullName,
                id,
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
            render: (record: { key: string; fullName: string; id: string }) => {
                console.log(record);
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
                            Update
                        </Button>
                        <Button
                            onClick={() => handleBlock(record.id)}
                            style={{ marginRight: "20px" }}
                        >
                            Block
                        </Button>
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

export default Students;
