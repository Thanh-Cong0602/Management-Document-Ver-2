/** @format */

// eslint-disable-next-line no-unused-vars
import react, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { changePassword } from "../../../Api/Service/user.service";

function ChangePassword() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [showNoti, setShowNoti] = useState(false);
  const [updateFail, setUpdateFail] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const id = useSelector((state) => state.userReducer.id);
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const checkNewPassword = () => {
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      setError("Please fill in all fields");
      return false;
    } else if (newPassword !== confirmPassword) {
      setError("Confirmation password does not match");
      return false;
    } else return true;
  };

  const handleChangePassword = () => {
    const check = checkNewPassword();
    if (check) {
      changePassword(`user/${id.idUser}/password`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
        .then(() => {
          setUpdateFail(false);
          setShowNoti(true);
        })
        .catch(() => {
          setUpdateFail(true);
          setShowNoti(true);
        });
    }
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: formLayout === "inline" ? "none" : 600,
        padding: "40px 20px 20px 20px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        margin: "0 auto",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: "16px",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          Change password
        </div>
      </div>
      <Form.Item label="Old password">
        <Input.Password
          placeholder="Old password"
          visibilityToggle={{
            visible: oldPasswordVisible,
            onVisibleChange: setOldPasswordVisible,
          }}
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
            setError("");
          }}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="New password">
        <Input.Password
          value={newPassword}
          placeholder="New password"
          visibilityToggle={{
            visible: newPasswordVisible,
            onVisibleChange: setNewPasswordVisible,
          }}
          style={{ width: "100%" }}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
        />
      </Form.Item>

      <Form.Item label="Confirm new password">
        <Input.Password
          value={confirmPassword}
          placeholder="Confirm new password"
          visibilityToggle={{
            visible: confirmPasswordVisible,
            onVisibleChange: setConfirmPasswordVisible,
          }}
          onChange={(e) => {
            setError("");
            setConfirmPassword(e.target.value);
          }}
          style={{ width: "100%" }}
        />
      </Form.Item>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "35px",
        }}
      >
        <Form.Item {...buttonItemLayout}>
          <Button
            type="primary"
            style={{ marginRight: "16px", width: "160px" }}
            onClick={() => {
              handleChangePassword();
            }}
          >
            Save
          </Button>
        </Form.Item>
      </div>

      <Modal
        title="Notification"
        open={showNoti}
        onOk={() => {
          setShowNoti(false);
          if (!updateFail) {
            setNewPassword("");
            setOldPassword("");
            setConfirmPassword("");
          }
        }}
        onCancel={() => {
          setShowNoti(false);
          if (!updateFail) {
            setNewPassword("");
            setOldPassword("");
            setConfirmPassword("");
          }
        }}
      >
        {updateFail ? (
          <p
            style={{
              fontSize: "20px",
            }}
          >
            Old password is not correct
          </p>
        ) : (
          <p
            style={{
              fontSize: "20px",
            }}
          >
            Change password successfully
          </p>
        )}
      </Modal>
    </Form>
  );
}

export default ChangePassword;
