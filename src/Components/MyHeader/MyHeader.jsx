import React from "react";
import { Flex, Avatar, Typography } from "antd";
import logo from "../../assets/logo.jpg";
const MyHeader = () => {
  return (
    <Flex
      style={{
        width: "100%",
        padding: "0 2%",
        backgroundColor: "white",
        height: "60px",
      }}
      justify={"space-between"}
      align={"flex-start"}>
      <div style={{ display: "flex" }}>
        <Avatar
          shape="square"
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 60, xxl: 100 }}
          src={logo}
        />
        <Typography
          style={{ color: "black", paddingTop: "9%", fontWeight: "700" }}>
          Quản lý sách online
        </Typography>
      </div>
      <Typography style={{ paddingTop: "1.2%", fontWeight: "600" }}>
        Đăng Nhập
      </Typography>
    </Flex>
  );
};
export default MyHeader;
