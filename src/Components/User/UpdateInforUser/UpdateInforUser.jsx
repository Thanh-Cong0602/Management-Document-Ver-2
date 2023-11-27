/** @format */

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button, Form, Input, DatePicker, Select, Modal } from "antd";
import { useSelector } from "react-redux";
import { getUser, updateUser } from "../../../Api/Service/user.service";

function UpdateInforUser() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [showNoti, setShowNoti] = useState(false);
  const [updateFail, setUpdateFail] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [infoForm, setInfoForm] = useState({});
  const [originInfoForm, setOriginInfoForm] = useState({});
  const dataUser = useSelector((state) => state.userReducer.dataUser);
  console.log(dataUser);
  const getInformation = () => {
    getUser(`user/${dataUser}`)
      .then((res) => {
        setInfoForm({
          id: res.data.id,
          name: res.data.name,
          phone: res.data.phone,
          dob: res.data.dob,
          gender: res.data.gender,
          role: res.data.role.role,
          password: "091002",
        });

        setOriginInfoForm({
          id: res.data.id,
          name: res.data.name,
          phone: res.data.phone,
          dob: res.data.dob,
          gender: res.data.gender,
          role: res.data.role.role,
          password: "091002",
        });
      })
      .catch((error) => {
        error;
      });
  };

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const handleChangeDob = (date, dateString) => {
    date;
    setInfoForm({
      ...infoForm,
      dob: dateString,
    });
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

  const getFormatedDob = (dob) => {
    const firstIndex = dob.indexOf("-");
    const secondIndex = dob.lastIndexOf("-");
    const day = dob.slice(secondIndex + 1);
    const month = dob.slice(firstIndex + 1, secondIndex);
    const year = dob.slice(0, firstIndex);
    return day + "/" + month + "/" + year;
  };

  const handleUpdate = () => {
    const data = {
      ...infoForm,
      dob: getFormatedDob(infoForm.dob),
    };

    updateUser("user", data)
      .then(() => {
        setUpdateFail(false);
        setShowNoti(true);
      })
      .catch((error) => {
        error;
        setUpdateFail(true);
        setShowNoti(true);
      });
  };

  useEffect(() => {
    getInformation();
  }, []);

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
      <div
        style={{
          display: "flex",
          marginBottom: "16px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>Thông tin cá nhân</div>
        {!isUpdating && (
          <Button type="primary" onClick={() => setIsUpdating(true)}>
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
                  color: "#333333",
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
                  color: "#333333",
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
                    color: "#333333",
                  }
                : {}
            }
          />
        ) : (
          <DatePicker
            defaultValue={dayjs(infoForm.dob, "YYYY-MM-DD")}
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            onChange={handleChangeDob}
          />
        )}
      </Form.Item>

      <Form.Item label="Giới tính">
        {!isUpdating ? (
          <Input
            placeholder=""
            value={infoForm.gender ? "Nam" : "Nữ"}
            disabled={!isUpdating}
            style={
              !isUpdating
                ? {
                    cursor: "default",
                    backgroundColor: "#fff",
                    color: "#333333",
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
          <Button
            type="primary"
            style={{ marginRight: "16px" }}
            onClick={() => {
              handleUpdate();
              console.log(infoForm);
            }}
          >
            Cập nhật
          </Button>
          <Button type="primary" ghost onClick={() => handleCancel()}>
            Hủy bỏ
          </Button>
        </Form.Item>
      )}

      <Modal
        title="Thông báo"
        open={showNoti}
        onOk={() => {
          setShowNoti(false);
          setIsUpdating(false);
        }}
        onCancel={() => {
          setShowNoti(false);
          setIsUpdating(false);
        }}
      >
        {updateFail ? (
          <p
            style={{
              fontSize: "20px",
            }}
          >
            Cập nhật thông tin thất bại
          </p>
        ) : (
          <p
            style={{
              fontSize: "20px",
            }}
          >
            Cập nhật thông tin thành công
          </p>
        )}
      </Modal>
    </Form>
  );
}
export default UpdateInforUser;
