import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { ThemeSettingProvider } from "provider/ThemeProvider";

import "antd/dist/antd.less";
/** Import Style Sheets */
import "assets/less/admin/theme-light/index.less";
import "assets/less/admin/theme-dark/index.less";

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
