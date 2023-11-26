/** @format */

import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Api/Service/user.service";
import { setDataUser, setLoggedIn } from "../../Redux/_action/user.action";
import { useDispatch } from "react-redux";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const body = {
      email: values.email,
      password: values.password,
    };
    login("user/login", body).then((res) => {
      dispatch(setLoggedIn(true));
      dispatch(setDataUser(res.data.data));
      navigate("/user/homepage");
    });
  };
  return (
    <div
      style={{
        width: "497px",
        height: "210px",
        border: "2px solid black",
        padding: "50px",
        margin: "7vh auto auto",
        borderRadius: "10px",
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p>Dont have an account?</p> <Link to="/register"> Register</Link>
        </div>
      </Form>
    </div>
  );
}

export default LoginScreen;
