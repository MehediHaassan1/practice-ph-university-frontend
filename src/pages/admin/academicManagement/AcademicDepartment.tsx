/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Pagination, Row, Table, TableProps } from "antd";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";

const AcademicDepartment = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = academicManagementApi.useGetAllDepartmentQuery([
        { name: "limit", value: 3 },
        { name: "page", value: page },
        { name: "sort", value: "-createdAt" },
    ]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const metaData = data?.meta;

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
        {
            title: "Action",
            key: "action",
            render: () => (
                <span>
                    <Button>Update</Button>
                </span>
            ),
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
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                />
                <Pagination
                    total={metaData?.total}
                    pageSize={metaData?.limit}
                    current={page}
                    onChange={(value) => setPage(value)}
                />
            </Col>
        </Row>
    );
};

export default AcademicDepartment;
