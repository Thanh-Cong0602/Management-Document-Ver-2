import React from "react";

import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

function Upload() {

  const onFinish = (values) => {
    fetch("http://localhost/document", {
      method: "POST",
      body: values,
    })
      .then((response) => response.json())
      .then((result) => {
        // navigate("/user/homepage");
      
       
        console.log("Success:", result);
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
      <Form
      // {...formItemLayout}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[{ required: true, message: `Please input your file's name!` }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      
    >

      <Input />
    </Form.Item>
  
    <Form.Item
      label="Choosen File"
      name="file"
      rules={[
        {
          type: 'file',
          message: 'Choosen file is not valid'
      },
      { required: true, message: `Please choose your file` }]}

    > 
    <Upload>

      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
   
  </Form>
  );
}

export default Upload;
