import { useParams } from "react-router-dom";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { transformData } from "../../../utils/transformData";
import { Avatar, Card, Table, Tabs, TabsProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

const FacultyDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = userManagementApi.useGetSingleFacultyQuery(id);
    if (isLoading) return <div>Loading...</div>;

    const generalInformationData = transformData(data?.data);
    const academicFacultyData = transformData(data?.data?.academicFaculty);
    const academicDepartmentData = transformData(
        data?.data?.academicDepartment
    );

    const tabData = [
        {
            label: "General Information",
            data: generalInformationData,
        },
        {
            label: "Academic Faculty",
            data: academicFacultyData,
        },
        {
            label: "Academic Department",
            data: academicDepartmentData,
        },
    ];

    const columns = [
        {
            title: "",
            dataIndex: "label",
            key: "label",
            width: "30%",
        },
        {
            title: "",
            dataIndex: "colon",
            key: "colon",
            width: "2%",
            render: () => ":",
        },
        {
            title: "",
            dataIndex: "value",
            key: "value",
        },
    ];

    // ----------------- Tab start
    const items: TabsProps["items"] = tabData.map((tab, index) => ({
        key: (index + 1).toString(),
        label: tab.label,
        children: (
            <Card style={styles.card}>
                <Table
                    dataSource={tab.data}
                    columns={columns}
                    pagination={false}
                    showHeader={false}
                    bordered
                    style={styles.table}
                />
            </Card>
        ),
    }));
    // ----------------- Tab end

    return (
        <div className="student-profile" style={styles.container}>
            <div style={styles.row}>
                <div style={styles.colLeft}>
                    <Card
                        style={styles.card}
                        cover={
                            <div style={styles.cardHeader}>
                                {data?.data?.profileImg ? (
                                    <img
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                        src={data?.data?.profileImg}
                                    />
                                ) : (
                                    <Avatar
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                        size={128}
                                        icon={<UserOutlined />}
                                    />
                                )}

                                <h3 style={styles.name}>
                                    {data?.data?.name?.firstName +
                                        " " +
                                        data?.data?.name?.middleName +
                                        " " +
                                        data?.data?.name?.lastName}
                                </h3>
                            </div>
                        }
                    >
                        <div style={styles.cardBody}>
                            <p style={styles.info}>
                                <strong>Student ID:</strong> {data?.data?.id}
                            </p>
                        </div>
                    </Card>
                </div>
                <div style={styles.colRight}>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>
        </div>
    );
};

export default FacultyDetails;

const styles: { [key: string]: CSSProperties } = {
    container: {
        overflowX: "auto",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    colLeft: {
        flex: 1,
        marginRight: "20px",
    },
    colRight: {
        flex: 2,
    },
    card: {
        borderRadius: "10px",
    },
    cardHeader: {
        textAlign: "center",
        backgroundColor: "transparent",
    },
    avatar: {
        border: "10px solid #ccc",
        borderRadius: "50%",
        margin: "10px auto",
    },
    name: {
        fontSize: "20px",
        fontWeight: "700",
    },
    cardBody: {
        padding: "0px",
    },
    info: {
        fontSize: "16px",
        color: "#000",
    },
    title: {
        fontSize: "20px",
        fontWeight: "700",
        paddingBottom: "10px",
    },
    table: {
        marginTop: "10px",
    },
};
