/** @format */

import { Avatar, Dropdown, Flex, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoggedIn } from "../../Redux/_action/user.action";
import logo from "../../assets/logo.jpg";
import user_img from "../../assets/user_img.png";
import { UserAddOutlined, PoweroffOutlined } from "@ant-design/icons";
import "./MyHeader.css";

const MyHeader = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLoggedIn(false));
  };

  const items = [
    {
      label: (
        <div style={{ display: "flex", gap: "10px" }}>
          <UserAddOutlined />
          <Link to="/user/updateInformation">Update Information</Link>
        </div>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div style={{ display: "flex", gap: "10px" }}>
          <PoweroffOutlined />
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
  ];
  return (
    <Flex
      style={{
        width: "100%",
        padding: "0 2%",
        backgroundColor: "whitesmoke",
        height: "60px",
      }}
      justify={"space-between"}
      align={"flex-start"}
    >
      <div style={{ display: "flex" }}>
        <Avatar shape="square" size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 60, xxl: 100 }} src={logo} />
        <Typography style={{ color: "black", paddingTop: "9%", fontWeight: "700" }}>Quản lý sách online</Typography>
      </div>
      {!isLoggedIn ? (
        <Typography style={{ paddingTop: "1.2%", fontWeight: "600" }}>
          <Link to="/login">Đăng Nhập</Link>
        </Typography>
      ) : (
        <Dropdown
          menu={{
            items,
          }}
        >
          <Link onClick={(e) => e.preventDefault()}>
            <Space>
              <img src={user_img} alt="Avatar User" className="navbar_user_img" />
            </Space>
          </Link>
        </Dropdown>
      )}
    </Flex>
  );
};
export default MyHeader;
