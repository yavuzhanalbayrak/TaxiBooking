import { Avatar, Card, Col, Row, Button } from "antd";
import React, { useEffect } from "react";
import { UserOutlined, HomeOutlined, EditOutlined } from "@ant-design/icons";
import GlobalContext from "../../context/GlobalContext";
import "./Profile.scss";
import Field from "../../components/field/Field";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import LanguageSelector from "../../components/language/LanguageSelector";
import { useTranslation } from "react-i18next";
import profileImage from "../../images/dandun.jpg"

export default function ProfilePage() {
  const { isPhone, height, setSelectedKeys } = React.useContext(GlobalContext);
  const { t } = useTranslation();

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
            <Col
              span={24}
            >
              <Row justify="center">
                <Col>
                  <img
                  src={profileImage}
                  alt="profil fotoğrafı"
                  className="profile-image"
                  />
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
                    titleSpan={8}
                    fieldSpan={16}
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
                  ></Field>
                  <Field
                    title={t("profile.languageOption")}
                    field={<LanguageSelector />}
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
