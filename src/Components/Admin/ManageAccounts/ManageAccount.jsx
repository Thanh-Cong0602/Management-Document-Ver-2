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
    title: "Điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <div
        type="button"
        style={{ color: "red" }}
        // onClick={() => {
        //   axios.delete(`http://localhost/document/${record.id}`).then(() => {
        //     window.location.reload();
        //   });
        // }}
      >
        <DeleteOutlined />
      </div>
    ),
  },
];

const data = [
  {
    id: '1',
    name: 'Mike',
    phone: '090888888',
  },
  {
    id: '2',
    name: 'Lily',
    phone: '0905555555',
  },
  {
    id: '3',
    name: 'Carl',
    phone: '090444444',
  },
]

/*const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};*/

const ManageAccount = () => {
  //const [data, setData] = useState([]);
  /*useEffect(() => {
    axios.get("http://localhost/document").then((res) => {
      const resData = res.data.map((item, key) => {
        return {
          ...item,
          id: key + 1,
        };
      });
      setData(resData);
      console.log(resData);
    });
  }, []);*/
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
