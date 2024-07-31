/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Table, TableProps } from "antd";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";

const AcademicDepartment = () => {
    const { data, isLoading } =
        academicManagementApi.useGetAllDepartmentQuery(undefined);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(data?.data);

    interface DataType {
        key: string;
        name: string;
        academicFaculty: string;
    }

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Academic Department",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Academic Faculty",
            dataIndex: "academicFaculty",
            key: "name",
        },
    ];

    const tableData: DataType[] = data?.data?.map(
        (item: { _id: string; name: string; academicFaculty: any }) => {
            return {
                key: item._id,
                name: item.name,
                academicFaculty: item?.academicFaculty?.name,
            };
        }
    );

    return (
        <Row justify="center" style={{ marginTop: 20 }}>
            <Col span={12}>
                <Table columns={columns} dataSource={tableData} />;
            </Col>
        </Row>
    );
};

export default AcademicDepartment;
