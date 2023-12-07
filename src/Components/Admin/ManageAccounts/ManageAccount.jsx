import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../Api/Service/user.service";
const columns = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    render : (record) => (
      <div>
        {record.role}
      </div>
    )
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
    render : (text) => (
      <div>
        {text ? "Nam" : "Nữ"}
      </div>
    )
  },
  {
    title: "Ngày sinh",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Điện thoại",
    dataIndex: "phone",
    key: "phone"
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (record) => (
      <div
        type="button"
        style={{ color: "red" }}
        //onClick={() => {
        //  axios.delete(`http://localhost/user/${record.id}`).then(() => {
        //    window.location.reload();
        //  });
        //}}
      >
        <DeleteOutlined />
      </div>
    ),
  },
];


const ManageAccount = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
   getAllUsers("user").then((res) => {
      console.log(res.data.content)
      const resData = res.data.content.map((item, key) => {
        return {
          ...item,
          id: key + 1,
        };
      });
      setData(resData);
      console.log(resData);
    });
  }, []);
  return (
    <div>
      <Table
        columns={columns}
        bordered
        title={() => "Danh sách tài khoản"}
        dataSource={data}
      />
    </div>
  );
};
export default ManageAccount;