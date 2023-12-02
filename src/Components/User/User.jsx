/** @format */
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
const { Header, Content } = Layout;
import Homepage from "./Homepage/Homepage";
import SidebarUser from "./SidebarUser";
import DocumentList from "./DocumentList/DocumentList";
const User = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <SidebarUser collapsed={collapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type='text'
            icon={
              collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/user/documentlists' element={<DocumentList />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default User;
