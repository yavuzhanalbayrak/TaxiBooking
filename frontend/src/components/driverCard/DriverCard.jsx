import React from "react";
import Card from "antd/es/card/Card";
import { Col, Row } from "antd";
import { CarOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import mc from "../../images/mc.jpg";

export default function DriverCard({ driver }) {
  const totalStars = 5;
  const filledStars = driver.point; // Ensure driver.point is between 0 and totalStars
  const emptyStars = totalStars - filledStars;
  return (
    <>
      <Row className="driver-card">
        <Col span={8}>
          <img
            style={{ height: "100%", objectFit: "contain" }}
            src={mc}
            alt=""
          />
        </Col>
        <Col span={16}>
          <Row className="driver-info">
            <Col span={24}>Araç Sahibi: {driver.driverName}</Col>
            <Col span={24}>Ücret/KM: {driver.pricePerKM}</Col>
            <Col span={24}>Marka: {driver.brand}</Col>
            <Col span={24}>Model: {driver.model}</Col>
            <Col span={24}>Yıl: {driver.year}</Col>
            <Col span={24}>
              <div>
                Puan:{" "}
                {[...Array(filledStars)].map((_, index) => (
                  <StarFilled style={{color:"#ffc800"}} key={index} />
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                  <StarOutlined key={index} />
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
