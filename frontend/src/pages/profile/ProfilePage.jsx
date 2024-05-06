import { Avatar, Col, Row } from "antd";
import React, { useEffect } from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import "./Profile.scss";

export default function ProfilePage() {
  const [lat, setLat] = React.useState("");
  const [lng, setLng] = React.useState("");

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
      // Request the user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Access the user's latitude and longitude
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);

          // Now you can use the latitude and longitude to perform location-based tasks
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);

          // You might want to send this information to your server for further processing
        },
        (error) => {
          // Handle errors if location retrieval fails
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <Row justify="center">
      <Col className="" span={16} sm={24} md={16}>
        <Col className="profile-card">
          <Row>
            <Col
              className="profile-image"
              span={8}
              sm={24}
              md={24}
              lg={12}
              xl={8}
            >
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
                    Adres Lat:{lat}
                  </Col>
                  <Col className="profile-field" span={24}>
                    Adres Lng:{lng}
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
        <Row>
          <Col className="profile-card" span={24}>
            asdas
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
