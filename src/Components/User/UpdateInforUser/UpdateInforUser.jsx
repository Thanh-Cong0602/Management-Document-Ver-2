import { useState } from "react";
import dayjs from "dayjs";
import { Button, Form, Input, DatePicker, Select } from "antd";

function UpdateInforUser() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [isUpdating, setIsUpdating] = useState(false);
  const [infoForm, setInfoForm] = useState({});
  const [originInfoForm, setOriginInfoForm] = useState({});

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const handleCancel = () => {
    setInfoForm({
      ...infoForm,
      name: originInfoForm.name,
      phone: originInfoForm.phone,
      dob: originInfoForm.dob,
      gender: originInfoForm.gender,
    });
    setIsUpdating(false);
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
      }}
    >
      <div style={{ display: "flex", marginBottom: "16px" }}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          Thông tin cá nhân
        </div>
        {!isUpdating && (
          <Button
            type="primary"
            style={{ marginRight: "16px" }}
            onClick={() => setIsUpdating(true)}
          >
            Cập nhật
          </Button>
        )}
      </div>

      <Form.Item label="Họ tên">
        <Input
          placeholder=""
          value={infoForm.name}
          disabled={!isUpdating}
          onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
          style={
            !isUpdating
              ? {
                  cursor: "default",
                  backgroundColor: "#fff",
                }
              : {}
          }
        />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input
          placeholder=""
          value={infoForm.phone}
          disabled={!isUpdating}
          onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
          style={
            !isUpdating
              ? {
                  cursor: "default",
                  backgroundColor: "#fff",
                }
              : {}
          }
        />
      </Form.Item>
      <Form.Item label="Ngày sinh">
        {!isUpdating ? (
          <Input
            placeholder=""
            value={infoForm.dob}
            disabled={!isUpdating}
            style={
              !isUpdating
                ? {
                    cursor: "default",
                    backgroundColor: "#fff",
                  }
                : {}
            }
          />
        ) : (
          <DatePicker
            defaultValue={dayjs("01/01/2015", "DD/MM/YYYY")}
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
          />
        )}
      </Form.Item>

      <Form.Item label="Giới tính">
        {!isUpdating ? (
          <Input
            placeholder=""
            value={infoForm.gender}
            disabled={!isUpdating}
            style={
              !isUpdating
                ? {
                    cursor: "default",
                    backgroundColor: "#fff",
                  }
                : {}
            }
          />
        ) : (
          <Select
            value={infoForm.gender ? "Nam" : "Nữ"}
            style={{ width: "100%", textAlign: "left" }}
            options={[
              { value: "Nam", label: "Nam" },
              { value: "Nữ", label: "Nữ" },
            ]}
            onChange={(value) => {
              if (value === "Nam") {
                setInfoForm({
                  ...infoForm,
                  gender: true,
                });
              } else {
                setInfoForm({
                  ...infoForm,
                  gender: false,
                });
              }
            }}
          />
        )}
      </Form.Item>
      {isUpdating && (
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" style={{ marginRight: "16px" }}>
            Cập nhật
          </Button>
          <Button type="primary" ghost onClick={() => handleCancel()}>
            Hủy bỏ
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}
export default UpdateInforUser;
