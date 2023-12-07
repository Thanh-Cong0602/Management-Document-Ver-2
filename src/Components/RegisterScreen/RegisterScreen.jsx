/** @format */

import { Button, DatePicker, Form, Input, Select, message } from "antd";
import "./RegisterScreen.css";
import { register } from "../../Api/Service/user.service";
const { Option } = Select;
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
const disabledDate = (current) => {
  return current && current > moment().endOf("day");
};
function RegisterScreen() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values)
    const isValidTel = /\D/;
    const isValidSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
    if (values.password !== values.confirmPassword) {
      messageApi.open({
        type: "error",
        content: "Password and confirm password don't match",
      });
      return;
    }
    if (isValidSpecialCharacter.test(values.name)) {
      messageApi.open({
        type: "error",
        content: "Fullname cannot contain special characters.",
      });
      return;
    }
    if (isValidTel.test(values.phone) || values.phone.length > 10 || values.phone.length <= 9) {
      messageApi.open({
        type: "error",
        content: "Invalid phone number",
      });
      return;
    }
    const body = {
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone,
      dob: values["date-picker"].format("DD/MM/YYYY"),
      gender: values.gender === "male",
      role: "user",
    };
    register("user/register", body)
      .then(() => {
        console.log("Success");
        console.log(body);
        messageApi.open({
          type: "success",
          content: "Register account successfully",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        const message = err.response.data.message;
        messageApi.open({
          type: "error",
          content: message,
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    messageApi.open({
      type: "error",
      content: errorInfo,
    });
  };

  return (
    <>
      {contextHolder}
      <div style={{ textAlign: "center" }}>
        <p className="title">Register Account</p>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          style={{
            maxWidth: 600,
            margin: "auto",
            textAlign: "left",
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
            <Input placeholder="Enter your email" type="email" />
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

          <Form.Item name="date-picker" label="DateOfBirth" {...config}>
            <DatePicker style={{ width: "350px" }} disabledDate={disabledDate} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={"+84"}
              style={{
                width: "100%",
              }}
            />
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

      
          <div style={{ textAlign: "center" }}>
            Do you have already account? <Link to="/login">Login Here</Link>
          </div>
          <Form.Item style={{ textAlign: "center", paddingTop: "20px", paddingLeft: "150px" }}>
            <Button type="primary" htmlType="submit" size="large">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default RegisterScreen;
