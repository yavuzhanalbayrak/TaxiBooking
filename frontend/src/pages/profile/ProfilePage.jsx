import { Avatar, Card, Col, Row, Button } from "antd";
import React, { useEffect } from "react";
import {
  UserOutlined,
  HomeOutlined,
  EditOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import GlobalContext from "../../context/GlobalContext";
import "./Profile.scss";
import Field from "../../components/field/Field";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import LanguageSelector from "../../components/language/LanguageSelector";
import { useTranslation } from "react-i18next";
import profileImage from "../../images/dandun.jpg";

export default function ProfilePage() {
  const { isPhone, height, setSelectedKeys } = React.useContext(GlobalContext);
  const { t } = useTranslation();
  const [focus, setFocus] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  useEffect(() => {
    setSelectedKeys(0);
  }, []);

  const user = useAuthUser();

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
                      setFocus(true);
                    }}
                    onMouseLeave={() => setFocus(false)}
                    onMouseDown={() => setIsActive(true)}
                    onMouseUp={() => setIsActive(false)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="profile-image"
                      onClick={() => {
                        return;
                      }}
                      src={profileImage}
                      alt="profil fotoğrafı"
                      style={{
                        opacity: focus ? (isActive ? "0.90" : "0.75") : "1",
                      }}
                    />

<div
        style={{
          position: "absolute",
          bottom: "0px", // Adjust this value as needed
          right: "0px", // Adjust this value as needed
          zIndex: 1,
          fontSize: "40px",
          transition: "transform 0.3s, opacity 0.3s, font-size 0.3s",
          transform: focus ? isActive ? "translate(-50%, -50%) scale(1.3)":"translate(-50%, -50%)" : "translate(-50%, -50%) scale(0)",
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
                    icon={<EditOutlined />}
                    style={{
                      position: "absolute",
                      bottom: 0, // Adjust this value as needed
                      right: 0, // Adjust this value as needed
                      zIndex: 1,
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Col className="profile-title" span={24}>
                {t("profile.personalinformation")}
              </Col>

              <Col className="user-info driver-infos">
                <Row>
                  <Field
                    title={t("profile.fullname")}
                    field={user.name + " " + user.surname}
                    titleSpan={12}
                    fieldSpan={12}
                  ></Field>
                  <Field
                    title={t("profile.number")}
                    field={user.phone}
                    titleSpan={12}
                    fieldSpan={12}
                  ></Field>
                  <Field
                    title={t("profile.email")}
                    field={user.email}
                    titleSpan={12}
                    fieldSpan={12}
                  ></Field>
                  <Field
                    title={t("profile.address")}
                    field={user.address}
                    titleSpan={12}
                    fieldSpan={12}
                  ></Field>
                  <Field
                    title={t("profile.languageOption")}
                    field={<LanguageSelector />}
                    titleSpan={12}
                    fieldSpan={12}
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
