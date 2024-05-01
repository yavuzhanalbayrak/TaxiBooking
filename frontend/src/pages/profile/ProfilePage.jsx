import { Avatar, Col, Row } from "antd";
import React from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import "./Profile.scss";

export default function ProfilePage() {
  return (
    <Row justify="center">
      <Col className="" span={16} sm={24} md={16}>
        <Col className="profile-card">
          <Row>
            <Col className="profile-image" span={8} sm={24} md={24} lg={12} xl={8}>
              <Avatar
                style={{ height: "25vh", width: "25vh", fontSize: "20vh" }}
                size="large"
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={16} sm={24} md={24} lg={12} xl={16}>
              <Col className="profile-title" span={24}>
                Kullanıcı Bilgileri
              </Col>

              <Col className="user-info">
                <Row gutter={[0, 10]}>
                  <Col className="profile-field" span={24}>
                    Adı Soyadı:
                  </Col>
                  <Col className="profile-field" span={24}>
                    E-Posta:
                  </Col>
                  <Col className="profile-field" span={24}>
                    Telefon Numarası:
                  </Col>
                  <Col className="profile-field" span={24}>
                    Adres:
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
        <Row >

        <Col className="profile-card" span={24}>asdas</Col>
        </Row>
      </Col>
    </Row>
  );
}
