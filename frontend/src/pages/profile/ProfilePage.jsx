import { Avatar, Card, Col, Row, Button } from "antd";
import React, { useEffect, useRef } from "react";
import {
  UserOutlined,
  HomeOutlined,
  EditOutlined,
  CameraOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import GlobalContext from "../../context/GlobalContext";
import "./Profile.scss";
import Field from "../../components/field/Field";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import LanguageSelector from "../../components/language/LanguageSelector";
import { useTranslation } from "react-i18next";
import profileImage from "../../images/dandun.jpg";
import { toast } from "react-toastify";
import api from "../../utils/api";
import config from "../../config";

export default function ProfilePage() {
  const { isPhone, height, setSelectedKeys } = React.useContext(GlobalContext);
  const { t } = useTranslation();
  const [focus, setFocus] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [profilePhotoSelect, setProfilePhotoSelect] = React.useState(false);
  const user = useAuthUser();
  const [userInfo, setUserInfo] = React.useState(user);
  const fileInputRef = useRef(null);

  const [fieldValue, setFieldValue] = React.useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
  });

  const fields = [
    {
      title: t("profile.fullname"),
      field: userInfo.name,
      value: "name",
      placeholder: t("profile.placeholder.name"),
    },
    { title: t("profile.number"), field: userInfo.phone, value: "phone" },
    {
      title: t("profile.email"),
      field: userInfo.email,
      value: "email",
      placeholder: t("profile.placeholder.email"),
    },
    {
      title: t("profile.address"),
      field: userInfo.address?.label,
      value: "address",
    },
  ];

  useEffect(() => {
    setSelectedKeys(0);
  }, []);

  //AXIOS PUT & GET
  useEffect(() => {
    console.log("userInfo:", userInfo);
  }, [userInfo]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [file, setFile] = React.useState(null);
  const [uploadedFilePath, setUploadedFilePath] = React.useState("");
  const [retrievedImage, setRetrievedImage] = React.useState(null);
  const [isPhotoLoading, setIsPhotoLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]);

    await handleUpload(file);
    await handleRetrieve();
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // "image" should match the key in Postman
    formData.append("id", `${user.id}`);

    try {
      const res = await api.post(`${config.urls.setImage}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedFilePath(res.data.filePath);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const handleRetrieve = async () => {
    setIsPhotoLoading(true);
    try {
      const res = await api.get(`${config.urls.getImage}/${user.id}`, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(res.data);
      setRetrievedImage(imageUrl);
    } catch (err) {
      console.error("Error retrieving file:", err);
    }
    setIsPhotoLoading(false);
  };

  React.useEffect(() => {
    handleRetrieve();
  }, []);

  return (
    <Row justify="center">
      <Col className="" span={24} sm={24} md={16}>
        <Col
          style={
            isPhone
              ? { height: `calc(${height}px - 64px)` }
              : { borderRadius: "20px" }
          }
          className="profile-card"
        >
          <Row>
            <Col span={24}>
              <Row justify="center">
                <Col>
                  <div
                    onMouseEnter={() => {
                      !isPhotoLoading && setFocus(true);
                    }}
                    onMouseLeave={() => setFocus(false)}
                    onMouseDown={() => setIsActive(true)}
                    onMouseUp={() => setIsActive(false)}
                    style={{ cursor: "pointer" }}
                    onClick={!isPhotoLoading && handleImageClick}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    {isPhotoLoading ? (
                      <div className="profile-image">
                        <div className="skeleton"></div>
                      </div>
                    ) : (
                      <img
                        className="profile-image"
                        src={retrievedImage || profileImage}
                        alt="profil fotoğrafı"
                        style={{
                          opacity: "1",
                        }}
                      />
                    )}

                    <div
                      style={{
                        position: "absolute",
                        bottom: "0px", // Adjust this value as needed
                        right: "0px", // Adjust this value as needed
                        zIndex: 1,
                        fontSize: "40px",
                        transition:
                          "transform 0.3s, opacity 0.3s, font-size 0.3s",
                        transform: focus
                          ? isActive
                            ? "translate(-50%, -50%) scale(1.3)"
                            : "translate(-50%, -50%)"
                          : "translate(-50%, -50%) scale(0)",
                        opacity: focus || isActive ? "1" : "0",
                        borderRadius: "50%",
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CameraOutlined />
                    </div>
                  </div>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={
                      edit ? (
                        <CloseCircleOutlined style={{ fontSize: "21px" }} />
                      ) : (
                        <EditOutlined />
                      )
                    }
                    style={{
                      position: "absolute",
                      bottom: 0, // Adjust this value as needed
                      right: 0, // Adjust this value as needed
                      zIndex: 1,
                    }}
                    onClick={() => {
                      setEdit((prevState) => !prevState);
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Col className="profile-title" span={24}>
                {t("profile.personalinformation")}
              </Col>
              {edit && (
                <Row justify="center" style={{ marginTop: "10px" }}>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        setUserInfo(fieldValue);
                        setEdit(false);
                        toast.success(t("profile.saved"));
                      }}
                    >
                      {t("profile.save")}
                    </Button>
                  </Col>
                </Row>
              )}
              <Col className="user-info driver-infos">
                <Row>
                  {fields.map((fieldConfig) => (
                    <Field
                      key={fieldConfig.value}
                      title={fieldConfig.title}
                      field={fieldConfig.field}
                      titleSpan={10}
                      fieldSpan={14}
                      edit={edit}
                      fieldValue={fieldValue}
                      onFieldChange={setFieldValue}
                      value={fieldConfig.value}
                      placeholder={fieldConfig.placeholder}
                      loading={isLoading}
                    />
                  ))}
                  <Field
                    title={t("profile.languageOption")}
                    field={<LanguageSelector />}
                    titleSpan={10}
                    fieldSpan={14}
                  ></Field>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
}
