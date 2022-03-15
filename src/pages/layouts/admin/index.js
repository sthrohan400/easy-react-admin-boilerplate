import React, { useEffect, useState } from "react";
import { Drawer, Layout, Row, Divider } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingFilled,
    LogoutOutlined
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import adminRoutes from "config/routes/admin";
import SideBarMenu from "components/SideBarMenu";
import ThemeSelect from "components/ThemeSelect";
import { ThemeSettingProvider } from "provider/ThemeProvider";

/** Import Style Sheets */
import "assets/less/admin/theme-light/index.less";
import "assets/less/admin/theme-dark/index.less";
import LanguageSelect from "components/LanguageSelect";
import { LanguageSettingProvider } from "provider/LanguageProvider";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

function AdminLayout() {
    const [collapsed, setCollapsed] = useState(0);
    const [drawerVisible, setDrawerVisisble] = useState(1);

    /*** Redux State variables */
    const { themes, languages } = useSelector((state) => state.app);

    const toggle = () => {
        setCollapsed(!collapsed);
    };
    const toggleDrawer = () => {
        setDrawerVisisble(!drawerVisible);
    };
    /** Initially setting drawer visible from open to close so that
     * all the initial effects of the components inside the drawer
     * can be triggered. Like: setting themes, setting languages etc
     */
    useEffect(() => {
        setDrawerVisisble(0);
    }, []);

    return (
        <>
            <Layout className="default-admin-layout">
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <SideBarMenu routes={adminRoutes} mode="inline" defaultSelectedKeys={["1"]} />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: "trigger",
                            onClick: toggle
                        })}
                        <span className="setting-header-span">
                            <SettingFilled onClick={toggleDrawer} className="setting-icon" />
                            <LogoutOutlined />
                        </span>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280
                        }}>
                        <Outlet />
                    </Content>
                </Layout>
                <Drawer onClose={toggleDrawer} visible={drawerVisible}>
                    <Divider />
                    <Row>
                        <LanguageSettingProvider>
                            <LanguageSelect
                                style={{ float: "right", minWidth: "100" }}
                                options={languages}
                            />
                        </LanguageSettingProvider>
                    </Row>
                    <Divider />
                    <Row>
                        <ThemeSettingProvider>
                            <ThemeSelect options={themes} />
                        </ThemeSettingProvider>
                    </Row>
                    <Divider />
                </Drawer>
            </Layout>
        </>
    );
}

export default AdminLayout;
