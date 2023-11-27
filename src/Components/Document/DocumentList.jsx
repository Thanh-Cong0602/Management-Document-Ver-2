import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";

const columns = [
  // {
  //   title: "STT",
  //   dataIndex: "index",
  //   key: "index",
  // },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "URL",
    dataIndex: "filename",
    key: "filename",
    render: (text, record) => (
      <a href={record.url} target="__blank">
        {text}
      </a>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <div
        type="button"
        style={{ color: "red" }}
        onClick={() => {
          axios.delete(`http://localhost/document/${record.id}`).then(() => {
            window.location.reload();
          });
        }}
      >
        <DeleteOutlined />
      </div>
    ),
  },
];

const props = {
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
};

const DocumentList = () => {
  const [docList, setdocList] = useState([]);
  const getDocList = async () => {
    const { data } = await axios.get("http://localhost/document");
    setdocList(
      data.content

      // , () => {
      // console.log(docList);
      // }
    );
    // setdocList(data.content);
  };
  useEffect(() => {
    getDocList();
    console.log(docList);
  }, []);
  return (
    <div>
      <Table
        columns={columns}
        bordered
        title={() => "Danh sách"}
        dataSource={docList}
      />
    </div>
  );
};
export default DocumentList;
