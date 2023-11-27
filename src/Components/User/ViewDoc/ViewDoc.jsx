import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Select, Table } from "antd";

function ViewDoc() {
  const [docList, setDocList] = useState([]);
  const [currentDocInfo, setCurrentDocInfo] = useState({});
  const [currentDocVersionList, setCurrentDocVersionList] = useState([]);

  const columns = [
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "File name",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (record) => (
        <Link to={record} target="_blank">
          View
        </Link>
      ),
    },
  ];

  const dataSource = currentDocVersionList.map((docVersion) => ({
    version: docVersion.version,
    filename: docVersion.filename,
    content: docVersion.content,
    createdAt: docVersion.createdAt,
    updatedAt: docVersion.updatedAt,
    action: docVersion.url,
  }));

  const getDocList = async () => {
    const { data } = await axios.get("http://localhost/document");
    setDocList(data.content);
  };

  const getDocInfo = async (docId) => {
    const { data } = await axios.get(
      `http://localhost/document/${docId}/latest`
    );
    setCurrentDocInfo(data);
    const versionList = data.versionList;
    const versionListInfo = await Promise.all(
      versionList.map((version) => getDocVersion(docId, version))
    );
    setCurrentDocVersionList(versionListInfo);
  };

  const getDocVersion = async (docId, version) => {
    const { data } = await axios.get(
      `http://localhost/document/${docId}/${version}`
    );
    return data.documentVersion;
  };

  const handleChangeDoc = (value) => {
    getDocInfo(value);
  };

  useEffect(() => {
    getDocList();
  }, []);

  return (
    <div style={styles.container}>
      <h1>View Document</h1>
      <Select
        onChange={handleChangeDoc}
        defaultValue={"Select a document"}
        style={{ width: 300 }}
        options={docList.map((doc) => ({ value: doc.id, label: doc.name }))}
      />
      {currentDocInfo && (
        <Table
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: "20px" }}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: "75%",
  },
};

export default ViewDoc;
