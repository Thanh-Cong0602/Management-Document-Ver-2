/** @format */
import { Button, DatePicker, Form, Input, Select } from "antd";
import "./RegisterScreen.css";
const { Option } = Select;
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const RegisterScreen = () => (
  <div>
    <p className="title">Đăng ký tài khoản</p>
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
        margin: "auto",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please input your confirm password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter your confirm password" />
      </Form.Item>

      <Form.Item
        label="Fullname"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input fullname!",
          },
        ]}
      >
        <Input placeholder="Enter fullName" />
      </Form.Item>

      <Form.Item name="date-picker" label="DatePicker" {...config}>
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please select your gender!",
          },
        ]}
      >
        <Select placeholder="Please select gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);
export default RegisterScreen;
