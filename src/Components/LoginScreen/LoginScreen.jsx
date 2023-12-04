/** @format */

import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Api/Service/user.service";
import { setDataUser, setLoggedIn } from "../../Redux/_action/user.action";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
function LoginScreen() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const body = {
      email: values.email,
      password: values.password,
    };
    login("user/login", body)
      .then((res) => {
        const dataUser = {
          email: res.data.email,
          role: res.data.permission.role
        }
        dispatch(setLoggedIn(true));
        dispatch(setDataUser(dataUser));
        navigate("/");
      })
      .catch((err) => {
        const message = err.response.data.message;
        messageApi.open({
          type: "error",
          content: message,
        });
      });
  };
  return (
    <>
      {contextHolder}
      <div
        style={{
          width: "497px",
          height: "250px",
          border: "2px solid black",
          padding: "50px",
          margin: "7vh auto auto",
          borderRadius: "10px",
        }}
      >
        <label style={{ fontSize: "40px", fontWeight: "bold", textAlign: 'center' }}>Login</label>
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
            paddingTop: 20,
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
            <Input type="email" />
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
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            Do not have an account? <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default LoginScreen;
