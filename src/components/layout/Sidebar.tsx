import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { generateSidebarItems } from "../../utils/generateSidebarItems";
import adminItems from "../../routes/admin.routes";
import facultyItems from "../../routes/faculty.routes";
import studentItems from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hook";
import { jwtDecode } from "jwt-decode";
import { TAuthUser } from "../../redux/features/auth/authSlice";

const userRole = {
    ADMIN: "admin",
    STUDENT: "student",
    FACULTY: "faculty",
};

const Sidebar = () => {
    const { token } = useAppSelector((state) => state.auth);
    let user;
    if (token) {
        user = jwtDecode(token) as TAuthUser;
    }

    let sidebarItems;

    switch (user!.role) {
        case userRole.ADMIN:
            sidebarItems = generateSidebarItems(adminItems, userRole.ADMIN);
            break;
        case userRole.FACULTY:
            sidebarItems = generateSidebarItems(facultyItems, userRole.FACULTY);
            break;
        case userRole.STUDENT:
            sidebarItems = generateSidebarItems(studentItems, userRole.STUDENT);
            break;

        default:
            break;
    }
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{
                height: "100vh",
                position: "sticky",
                top: "0",
                left: "0",
                overflowY: "auto",
            }}
        >
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
                items={sidebarItems}
            />
        </Sider>
    );
};

export default Sidebar;
