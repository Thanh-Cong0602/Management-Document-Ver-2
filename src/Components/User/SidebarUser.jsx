/* eslint-disable no-unused-vars */
/** @format */

import React from "react";
import {
  HomeOutlined,
  FileOutlined,
  ContainerOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./User.css";
import { Link } from "react-router-dom";
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
              key: "/",
              icon: <HomeOutlined />,
              label: <Link to='/'>Homepage</Link>,
            },
            {
              key: "/user/documentlists",
              icon: <ContainerOutlined />,
              label: (
                <Link to='/user/documentlists'>
                  Document Lists
                </Link>
              ),
            },
            {
              key: "/user/documentlists",
              icon: <FileOutlined />,
              label: (
                <Link to='/user/viewdoc'>
                  View Document
                </Link>
              ),
            },
          ]}
        />
      </Sider>
    </div>
  );
}

export default SidebarUser;
