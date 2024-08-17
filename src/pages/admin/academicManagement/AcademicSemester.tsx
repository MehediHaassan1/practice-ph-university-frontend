import { Button, Table, TableColumnsType, TableProps } from "antd";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParams } from "../../../types/global.types";
import { useState } from "react";

export type TTableData = Pick<
    TAcademicSemester,
    "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
    const { data: semesterData, isLoading } =
        academicManagementApi.useGetAllAcademicSemesterQuery(params);

    if (isLoading) return <div>Loading...</div>;

    const tableData = semesterData?.data?.map(
        ({ _id, name, year, startMonth, endMonth }) => {
            return {
                key: _id,
                name,
                year,
                startMonth,
                endMonth,
            };
        }
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
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
            title: "Year",
            dataIndex: "year",
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
        {
            title: "Start Month",
            dataIndex: "startMonth",
        },
        {
            title: "End Month",
            dataIndex: "endMonth",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <span>
                    <Button>Update</Button>
                </span>
            ),
        }
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

export default AcademicSemester;
