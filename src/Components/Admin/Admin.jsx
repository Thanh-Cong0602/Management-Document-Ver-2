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
import SidebarAdmin from "./SidebarAdmin";
import ManageDocument from './ManageDocument/ManageDocument'
import ManageAccount from './ManageAccounts/ManageAccount'
import UploadDocument from "./UploadDocument/UploadDocument";
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <SidebarAdmin collapsed={collapsed} />
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
            <Route path='/admin/managedocument' element={<ManageDocument />} />
            <Route path='/admin/manageaccount' element={<ManageAccount />} />
            <Route path='/admin/uploaddocument' element={<UploadDocument />} />
            
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;