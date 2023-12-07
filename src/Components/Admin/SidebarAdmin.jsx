/* eslint-disable no-unused-vars */
/** @format */

import React from "react";
import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  UploadOutlined
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
        width={220}
        style={{height: "auto"}}
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
              icon: <HomeOutlined />,
              label: <Link to='/'>Homepage</Link>,
            },
            {
              key: "/admin/manageaccount",
              icon: <UserOutlined />,
              label: (
                <Link to='/admin/manageaccount'>
                  Manage Accounts
                </Link>
              ),
            },
            {
              key: "/admin/managedocument",
              icon: <FileOutlined />,
              label: (
                <Link to='/admin/managedocument'>
                  Manage Documents
                </Link>
              ),
            },
             {
              key: "/admin/uploaddocument",
              icon: <UploadOutlined />,
              label: (
                <Link to='/admin/uploaddocument'>
                  Upload Documents
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
