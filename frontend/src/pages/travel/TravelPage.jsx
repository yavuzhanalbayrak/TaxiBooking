import React from "react";
import GlobalContext from "../../context/GlobalContext";
import { Button, Card, Col, Row } from "antd";
import Stripe from "../../api/Stripe";
import {
  LeftCircleOutlined,
  CarOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function TravelPage() {
  const { setSelectedKeys, isPhone, height, driver } =
    React.useContext(GlobalContext);

  const totalStars = 5;
  const filledStars = Math.max(0, Math.min(driver?.rating || 0, totalStars));
const emptyStars = totalStars - filledStars;

  React.useEffect(() => {
    setSelectedKeys(["2"]);
  }, []);

  return (
    <Row style={{ height: `calc(100vh - 100px)` }} align="middle">
      <Col span={24}>
        <Row justify="center">
          <Col span={22}>
            <Card
              title={
                <div style={{ textAlign: "center" }}>
                  {driver
                    ? "Yolculuk Bilgileri"
                    : "Henüz Bir Yolculuk Başlatmadınız!"}
                </div>
              }
              style={{ width: "100%" }}
            >
              {driver ? (
                <Row>
                  <Col span={24}>Adı: {driver?.name}</Col>
                  <Col span={24}>Soyadı: {driver?.surname}</Col>
                  <Col span={24}>E-Postası: {driver?.email}</Col>
                  <Col span={24}>Telefon Numarası: {driver?.phone}</Col>
                  <Col span={24}>Araç Markası: {driver?.car.band}</Col>
                  <Col span={24}>Araç Modeli: {driver?.car.model}</Col>
                  <Col span={24}>Araç Yılı: {driver?.car.year}</Col>
                  <Col span={24}>
                    <span>
                      Puan:{" "}
                      {[...Array(filledStars)].map((_, index) => (
                        <StarFilled style={{ color: "#ffc800" }} key={index} />
                      ))}
                      {[...Array(emptyStars)].map((_, index) => (
                        <StarOutlined key={index} />
                      ))}
                    </span>
                  </Col>
                </Row>
              ) : (
                <Row style={{ textAlign: "center" }}>
                  <Col style={{ fontSize: "30px" }} span={24}>
                    <CarOutlined />
                  </Col>

                  <Col span={24}>
                    <Link to="/">
                      <Button>
                        {" "}
                        <LeftCircleOutlined /> Araç Bul{" "}
                      </Button>
                    </Link>
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
        </Row>

        {/* <Stripe amount={100} currency={'usd'} mode={'payment'}/> */}
      </Col>
    </Row>
  );
}
