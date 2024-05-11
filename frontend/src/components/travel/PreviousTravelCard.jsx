import { Card, Col, Row } from "antd";
import React from "react";
import { CheckOutlined,RightOutlined } from "@ant-design/icons";
import "./travelStyle.scss";

export default function PreviousTravelCard(props) {
  return (
    <div className="prev-card">
      <Card style={{ width: "100%" }}>
        <Row style={{ borderBottom: "1px solid #00000015", width: "100%" }}>
          <div style={{ padding: "24px", width: "100%" }}>
            <Col className="prev-travel-title" span={24}>
              {props.title} ({props.distance})
            </Col>
            <Col className="prev-travel-date" span={24}>
              <span>{props.date}</span> <span className="time">{props.time}</span>
            </Col>
            <Row style={{ width: "100%" }}>
              <Col className="prev-travel-price" span={12}>
                Fiyat: <span className="price">{props.price}</span>
              </Col>
              <Col className="prev-travel-details" span={12} style={{textAlign:"end"}}>Detaylar <RightOutlined /></Col>
            </Row>
          </div>
        </Row>
        <Row style={{ padding: "24px" }}>
          <Col span={24}>
            <Row>
              <CheckOutlined style={{ fontSize: "16px" }} />
              <Col className="prev-travel-status">{props.status}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
