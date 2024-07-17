import { Col, Row, Table, TableProps } from "antd";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";

interface DataType {
    key: string;
    name: string;
}

const columns: TableProps<DataType>["columns"] = [
    {
        title: "Academic Faculty",
        dataIndex: "name",
        key: "name",
    },
];

const AcademicFaculty = () => {
    const { data, isLoading } =
        academicManagementApi.useGetAllFacultyQuery(undefined);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const tableData: DataType[] = data?.data?.map(
        (item: { _id: string; name: string }) => ({
            key: item._id,
            name: item.name,
        })
    );

    return (
        <Row justify="center" style={{ marginTop: 20 }}>
            <Col span={12}>
                <Table columns={columns} dataSource={tableData} />;
            </Col>
        </Row>
    );
};

export default AcademicFaculty;
