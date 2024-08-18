import {
    Button,
    Dropdown,
    MenuProps,
    Table,
    TableColumnsType,
    Tag,
} from "antd";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";
import { TRegisteredSemester } from "../../../types/courseManagement.types";
import moment from "moment";
import { useState } from "react";

export type TTableData = {
    name: TRegisteredSemester["academicSemester"]["name"];
    startDate: TRegisteredSemester["startDate"];
    endDate: TRegisteredSemester["endDate"];
};

const items: MenuProps["items"] = [
    {
        key: "UPCOMING",
        label: "Upcoming",
    },
    {
        key: "ONGOING",
        label: "Ongoing",
    },
    {
        key: "ENDED",
        label: "Ended",
    },
];

const RegisteredSemesters = () => {
    const [semesterId, setSemesterId] = useState("");
    const { data: registeredSemesterData, isLoading } =
        courseManagementApi.useGetAllRegisteredSemestersQuery(undefined);

    const [updateStatus] =
        courseManagementApi.useUpdateRegSemesterStatusMutation();

    if (isLoading) return <div>Loading...</div>;

    const tableData = registeredSemesterData?.data?.map(
        ({ _id, academicSemester, status, startDate, endDate }) => {
            return {
                key: _id,
                name: `${academicSemester?.name} ${academicSemester?.year}`,
                status,
                startDate: moment(new Date(startDate)).format("MMMM"),
                endDate: moment(new Date(endDate)).format("MMMM"),
            };
        }
    );

    const handleUpdateStatus: MenuProps["onClick"] = async (data) => {
        const updatedData = {
            id: semesterId,
            data: {
                status: data?.key,
            },
        };
        const res = await updateStatus(updatedData);
        console.log(res);
    };

    const menuProps = {
        items,
        onClick: handleUpdateStatus,
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (item) => {
                let color;
                if (item === "UPCOMING") {
                    color = "blue";
                } else if (item === "ONGOING") {
                    color = "green";
                } else if (item === "ENDED") {
                    color = "red";
                }
                return (
                    <Tag color={color} style={{ fontWeight: "bold" }}>
                        {item}
                    </Tag>
                );
            },
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
        },
        {
            title: "End Date",
            dataIndex: "endDate",
        },
        {
            title: "Action",
            key: "action",
            render: (item) => {
                return (
                    <Dropdown menu={menuProps} trigger={["click"]}>
                        <Button onClick={() => setSemesterId(item.key)}>
                            Update
                        </Button>
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={tableData}
        />
    );
};

export default RegisteredSemesters;
