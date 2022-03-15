import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import "antd/dist/antd.less";

const { Content } = Layout;

function DefaultLayout() {
    return (
        <Layout className="default-layout">
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default DefaultLayout;
