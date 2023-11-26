import logo from "../../assets/logo.jpg";
import { Avatar, Typography } from "antd";
import "./styles.css";
const MyFooter = () => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        padding: "1%",
        backgroundColor: "white",
      }}>
      <div style={{ width: "40%" }}>
        <div style={{ display: "flex" }}>
          <Avatar
            shape="square"
            src={logo}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 200, xxl: 100 }}
          />
          <Typography className="slogan">
            "Dữ liệu an toàn, Quản lý linh hoạt: Nền tảng quản lý tài liệu trực
            tuyến của bạn"
          </Typography>
        </div>
      </div>
      <div style={{ width: "20%" }}></div>
      <div style={{ width: "38%", color: "black" }}>
        <div>
          <Typography className="headInfo">Follow us</Typography>
          <div className="info">
            <Typography>Facabook</Typography>
            <Typography>Instagram</Typography>
          </div>
        </div>
        <div>
          <Typography className="headInfo">Contact</Typography>
          <div className="info">
            <Typography>Phone: 0334634543</Typography>
            <Typography>Email: "email@gmail.com"</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFooter;
