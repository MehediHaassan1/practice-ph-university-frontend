import { Table, TableColumnsType, TableProps } from "antd";
import { TAcademicSemester, TQueryParams } from "../../../types/global.types";
import { useState } from "react";
import userManagementApi from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<
    TAcademicSemester,
    "name" | "year" | "startMonth" | "endMonth"
>;

const Students = () => {
    const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);

    const { data: studentData, isLoading: studentLoading } =
        userManagementApi.useGetAllStudentQuery(undefined);

    if (studentLoading) return <div> Loading ...</div>;

    const tableData = studentData?.data?.map(({ _id, fullName, id }) => {
        return {
            key: _id,
            fullName,
            id,
        };
    });

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Full Name",
            dataIndex: "fullName",
            showSorterTooltip: { target: "full-header" },
            filters: [
                {
                    text: "Autumn",
                    value: "Autumn",
                },
                {
                    text: "Summer",
                    value: "Summer",
                },
                {
                    text: "Fall",
                    value: "Fall",
                },
            ],
        },
        {
            title: "ID",
            dataIndex: "id",
            filters: [
                {
                    text: "2024",
                    value: "2024",
                },
                {
                    text: "2025",
                    value: "2025",
                },
                {
                    text: "2026",
                    value: "2026",
                },
                {
                    text: "2027",
                    value: "2027",
                },
                {
                    text: "2028",
                    value: "2028",
                },
            ],
        },
        // {
        //     title: "Academic Semester",
        //     dataIndex: "academicSemester.name",
        // },
        // {
        //     title: "Academic Department",
        //     dataIndex: "academicDepartment",
        // },
    ];

    const onChange: TableProps<TTableData>["onChange"] = (
        _pagination,
        filters,
        _sorter,
        extra
    ) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParams[] = [];
            filters.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            );
            filters.year?.forEach((item) =>
                queryParams.push({ name: "year", value: item })
            );
            setParams(queryParams);
        }
    };

    return (
        <Table
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
            showSorterTooltip={{ target: "sorter-icon" }}
        />
    );
};

export default Students;
