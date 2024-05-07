import { Avatar, Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import GlobalContext from "../../context/GlobalContext";
import "./Profile.scss";

export default function ProfilePage() {
  const { isPhone, height } = React.useContext(GlobalContext);

  const user = {
    name: "Yavuzhan",
    surname: "Albayrak",
    phone: "+505 923 43 21",
    email: "yavuzhan@gmail.com",
    address: "Samsun/Atakum",
  }

  return (
    <Row justify="center">
      <Col className="" span={24} sm={24} md={16}>
        <Col
          style={isPhone ? {height:`calc(${height}px - 64px)`}:{ borderRadius: "20px" }}
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

              <Col className="user-info">
                <Row gutter={[0, 10]}>
                  <Card style={{ width: "100%", backgroundColor:"#f9f9f9" }}>
                    <Col className="profile-field" span={24}>
                      <Row>
                        <Col span={12}>Adı Soyadı</Col>
                        <Col style={{ textAlign: "right" }} span={12}>
                        {user.name + " "+ user.surname }
                        </Col>
                      </Row>
                    </Col>
                  </Card>
                  <Card style={{ width: "100%", backgroundColor:"#f9f9f9" }}>
                    <Col className="profile-field" span={24}>
                      <Row>
                        <Col span={12}>Telefon Numarası</Col>
                        <Col style={{ textAlign: "right" }} span={12}>
                          {user.phone}
                        </Col>
                      </Row>{" "}
                    </Col>
                  </Card>
                  <Card style={{ width: "100%", backgroundColor:"#f9f9f9" }}>
                    <Col className="profile-field" span={24}>
                      <Row>
                        <Col span={12}>E-Posta</Col>
                        <Col style={{ textAlign: "right" }} span={12}>
                          {user.email}
                        </Col>
                      </Row>{" "}
                    </Col>
                  </Card>
                  <Card style={{ width: "100%", backgroundColor:"#f9f9f9" }}>
                    <Col className="profile-field" span={24}>
                      <Row>
                        <Col span={12}>Adres</Col>
                        <Col style={{ textAlign: "right" }} span={12}>
                          {user.address}
                        </Col>
                      </Row>{" "}
                    </Col>
                  </Card>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
}
