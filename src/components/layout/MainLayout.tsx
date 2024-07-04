import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { generateSidebarItems } from "../../utils/generateSidebarItems";
import adminItems from "../../routes/admin.routes";

const { Header, Content, Sider } = Layout;

const items = [
    {
        key: "/",
        label: <NavLink to="/">Dashboard</NavLink>,
    },
    {
        key: "about",
        label: <NavLink to="about">About</NavLink>,
    },
    {
        key: "contact",
        label: <NavLink to="contact">Contact</NavLink>,
    },
];
const MainLayout = () => {
    return (
        <Layout style={{ height: "100vh" }}>
            <Sider breakpoint="lg" collapsedWidth="0">
                <div
                    style={{
                        height: "4rem",
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}
                >
                    Ph University
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={generateSidebarItems(adminItems, "admin")}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }} />
                <Content style={{ margin: "24px 16px 0" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
