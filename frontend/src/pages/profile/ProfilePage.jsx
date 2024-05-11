import { Avatar, Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import GlobalContext from "../../context/GlobalContext";
import "./Profile.scss";
import Field from "../../components/field/Field";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function ProfilePage() {
  const { isPhone, height, setSelectedKeys } = React.useContext(GlobalContext);

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
            <Col span={24} className="profile-image">
              <Avatar
                style={{ height: "100px", width: "100px", fontSize: "50px" }}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={24}>
              <Col className="profile-title" span={24}>
                Kullanıcı Bilgileri
              </Col>

              <Col className="user-info driver-infos">
                <Row>
                  <Field title={"Adı Soyadı"} field={user.name + " " + user.surname} titleSpan={8} fieldSpan={16}></Field>
                  <Field title={"Telefon Numarası"} field={user.phone} titleSpan={12} fieldSpan={12}></Field>
                  <Field title={"E-Posta"} field={user.email} titleSpan={12} fieldSpan={12}></Field>
                  <Field title={"Adres"} field={user.address}></Field>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
}
