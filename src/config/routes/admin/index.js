import AdminLayout from "pages/layouts/admin";
import { Navigate } from "react-router-dom";
import dashboardRoutes from "./dashboard";

function PrivateRoutes(props) {
    /**
     * TODO : Add your user authentication logic
     */
    const auth = true;
    return auth ? props.children : <Navigate to="/app/login" />;
}

const adminRoutes = [
    {
        menuFlag: true,
        title: "Root",
        path: "/admin",
        element: (
            <PrivateRoutes>
                <AdminLayout />
            </PrivateRoutes>
        ),
        children: [...dashboardRoutes]
    }
];

export default adminRoutes;
