/** @format */

import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./User.css";
const { Sider } = Layout;

// eslint-disable-next-line react/prop-types
function SidebarUser({ collapsed }) {
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
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
    </div>
  );
}

export default SidebarUser;
