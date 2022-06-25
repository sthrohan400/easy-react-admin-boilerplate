import React, { useEffect, useState } from "react";
import { HashRouter as Router, useRoutes, Navigate } from "react-router-dom";

import DefaultLayout from "pages/layouts/default";
import SignInPage from "pages/auth/signin";
import FourOFourPage from "pages/error/fourofour";
import adminRoutes from "./admin";

const defaultRoutes = [
    {
        path: "/app",
        element: <DefaultLayout />,
        children: [
            {
                path: "login",
                element: <SignInPage />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/app/login" />
    }
];

/**
 * Function uses react router v6 { useRoutes }hook to populate
 * routes dynamically
 * @param {object} props
 * @returns
 */
function RoutesConf(props) {
    // us Routes is a function that generates routes and router based on config
    let element = useRoutes(props.routes);
    return element;
}

function RoutesConfiguration() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        setRoutes([...defaultRoutes, ...adminRoutes]);
    }, []);

    return (
        <Router>
            <RoutesConf routes={routes} />
        </Router>
    );
}

export default RoutesConfiguration;
