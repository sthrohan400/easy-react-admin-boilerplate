import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { ThemeSettingProvider } from "provider/ThemeProvider";

import "antd/dist/antd.less";

const { Content } = Layout;

function DefaultLayout() {
    return (
        <ThemeSettingProvider>
            <Layout className="default-layout">
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </ThemeSettingProvider>
    );
}

export default DefaultLayout;
