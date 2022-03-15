import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { MinusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const SideBarMenu = (props) => {
    const { t } = useTranslation();
    const { routes, ...configuration } = props;
    /**
     * Used count as object to use pass by reference
     * strategy rather than pass by value as of native datatypes
     */
    let count = {
        value: 0
    };
    /**
     *
     * @param {Object} routes Object Routes Object
     * @param {int} count counter
     * @param {string} parentUrl path
     * @returns
     *
     * Router Object
     * title: Title of the menu
     * path: URL/Path of menu
     * icon: Optional icon component /  component not icon name string
     *
     * IMPORTANT: Menu tree is created only of routes whose
     * menuFlag is set to true otherwise skip.
     */
    const MenuTree = (routes, count, parentUrl = "") => {
        if (!routes.menuFlag) {
            return null;
        }
        /** Check if the routes have children
         * if children create submenu and add menu items
         * inside + append the parent route path so that
         * the link created is same as expected in available
         * routes list as multilevel menu can be constructed from
         * this component.
         */
        let tempPath = parentUrl.concat(parentUrl.length > 0 ? `/${routes.path}` : routes.path);
        if (routes.children && routes.children.length > 0) {
            /** routes.collapsible === true
             * collapsible flag will check to determine if submenu collapsible
             * should be added to the menu otherwise follow the same process
             * but only displays Menu Item on first level rather than multiple level
             * nested menus.
             *
             * If multilevel nested menu is needed please set collapsible as tru
             */
            if (routes.collapsible && routes.collapsible === true) {
                return (
                    <Menu.SubMenu
                        key={`sub${count.value}`}
                        icon={routes.icon}
                        title={t(`menu.${routes.title.toLowerCase()}`) || "N/A"}>
                        {routes.children.map((element, index) => {
                            count.value++;
                            return MenuTree(element, count, tempPath);
                        })}
                    </Menu.SubMenu>
                );
            } else {
                return routes.children.map((element, index) => {
                    count.value++;
                    return MenuTree(element, count, tempPath);
                });
            }
        } else {
            return (
                <Menu.Item
                    key={count.value}
                    title={routes.title}
                    icon={routes.icon || <MinusOutlined />}>
                    <Link to={tempPath}>{t(`menu.${routes.title.toLowerCase()}`)}</Link>
                </Menu.Item>
            );
        }
    };
    return (
        <Menu {...configuration}>
            {routes.map((element) => {
                count.value++;
                return MenuTree(element, count);
            })}
        </Menu>
    );
};

SideBarMenu.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            menuFlag: PropTypes.bool.isRequired // Flag to check if routes should be added to menu tree
        })
    ).isRequired
};

export default SideBarMenu;
