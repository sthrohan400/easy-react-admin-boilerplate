import { DashboardFilled } from "@ant-design/icons";
import DashboardPage from "pages/admin/dashboard";

const dashboardRoutes = [
    {
        menuFlag: true,
        icon: <DashboardFilled />,
        title: "Dashboard",
        path: "dashboard",
        element: <DashboardPage />
    }
];

export default dashboardRoutes;
