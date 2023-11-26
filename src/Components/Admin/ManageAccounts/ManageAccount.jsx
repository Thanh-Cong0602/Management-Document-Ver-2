import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";

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

const fakedata = [
  {
    id: '1',
    name: 'Mike',
    role: 'user',
    email: 'a@aaaaa.com',
    gender: 'Nam',
    dob: '1/1/1989',
    phone: '090888888',
  },
  {
    id: '2',
    name: 'Lily',
    role: 'user',
    email: 'b@bbbbb.com',
    gender: 'Nữ',
    dob: '1/12/1997',
    phone: '0905555555',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  },
  {
    id: '3',
    name: 'Carl',
    role: 'user',
    email: 'c@ccccc.com',
    gender: 'Nam',
    dob: '9/1/1999',
    phone: '090444444',
  }
]

const ManageAccount = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost/user").then((res) => {
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
