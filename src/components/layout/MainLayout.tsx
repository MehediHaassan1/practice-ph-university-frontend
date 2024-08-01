import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import { LogoutOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Layout>
            <Sidebar />
            <Layout>
                <Header>
                    <Button
                        style={{
                            background: "transparent",
                            color: "white",
                            border: "none",
                        }}
                        onClick={handleLogout}
                    >
                        <LogoutOutlined />
                    </Button>
                </Header>
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
