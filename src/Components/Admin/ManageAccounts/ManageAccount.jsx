import { DeleteOutlined, RetweetOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers, updateRole } from "../../../Api/Service/user.service";

const ManageAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
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
      render: (record) => <div>{record.role}</div>,
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
      render: (text) => <div>{text ? "Nam" : "Nữ"}</div>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "Flex" }}>
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
          <div
            type="button"
            style={{ color: "green", marginLeft: "30%" }}
            onClick={() => {
              updateRole(
                `user/${record.id}/role?role=${
                  record.role.role === "user" ? "admin" : "user"
                }`
              ).then(() => {
                setIsLoading(!isLoading);
              });
            }}>
            <RetweetOutlined />
          </div>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUsers("user").then((res) => {
      const resData = res.data.content.map((item, key) => {
        return {
          ...item,
          stt: key + 1,
        };
      });
      setData(resData);
    });
  }, [isLoading]);
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
