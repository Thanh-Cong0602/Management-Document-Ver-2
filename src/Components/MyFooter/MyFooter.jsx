/** @format */

import logo from "../../assets/logo.jpg";
import { Avatar, Typography } from "antd";
import "./styles.css";
const MyFooter = () => {
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px"
      }}
    >
      <div>
        <div style={{ display: "flex" }}>
          <Avatar shape="square" src={logo} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 200, xxl: 100 }} />
          <Typography className="slogan"> Dữ liệu an toàn, Quản lý linh hoạt: <br /> Nền tảng quản lý tài liệu trực tuyến của bạn</Typography>
        </div>
      </div>
      <div style={{ color: "black", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100px" }}>
          <Typography className="headInfo">Follow us</Typography>
          <div className="info">
            <Typography>Facabook</Typography>
            <Typography>Instagram</Typography>
          </div>
        </div>
        <div>
          <Typography className="headInfo">Contact</Typography>
          <div className="info" style={{width: "200px"}}>
            <Typography>Phone: 0334634543</Typography>
            <Typography>Email: superDev@gmail.com</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFooter;
