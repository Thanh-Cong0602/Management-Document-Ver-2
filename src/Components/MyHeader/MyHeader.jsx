/** @format */

import { Avatar, Flex, Typography } from "antd";
import user_img from "../../assets/user_img.png";
import "./MyHeader.css";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  setLoggedIn } from "../../Redux/_action/user.action";

const MyHeader = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLoggedIn(false));
  }
  return (
    <Flex
      style={{
        width: "100%",
        padding: "0 2%",
        backgroundColor: "white",
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
        <>
        <Link to="/" onClick={logout}>Logout</Link>
          <img src={user_img} alt="Avatar User" className="navbar_user_img" />
        </>
      )}
    </Flex>
  );
};
export default MyHeader;
