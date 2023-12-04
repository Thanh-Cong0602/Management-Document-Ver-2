/* eslint-disable no-unused-vars */
/** @format */

import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

// eslint-disable-next-line react/prop-types
function SidebarAdmin({ collapsed }) {
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className='sidebarUser'
      >
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: <Link to='/'>Homepage</Link>,
            },
            {
              key: "/admin/manageaccount",
              icon: <VideoCameraOutlined />,
              label: (
                <Link to='/admin/manageaccount'>
                  Manage Accounts
                </Link>
              ),
            },
            {
              key: "/user/documentlists",
              icon: <VideoCameraOutlined />,
              label: (
                <Link to='/user/documentlists'>
                  Document Lists
                </Link>
              ),
            },
          ]}
        />
      </Sider>
    </div>
  );
}

export default SidebarAdmin;
