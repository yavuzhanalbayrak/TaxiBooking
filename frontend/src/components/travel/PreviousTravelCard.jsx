import { Card, Col, Row } from "antd";
import React from "react";
import { CheckOutlined, RightOutlined } from "@ant-design/icons";
import "./travelStyle.scss";

export default function PreviousTravelCard(props) {

    const historyDetails={
        title: props.travelHistory.title,
        date: props.travelHistory.date,
        status: props.travelHistory.status,
        distance: props.travelHistory.distance,
        price: props.travelHistory.price
    }
  return (
    <div className="prev-card">
      <Card style={{ width: "100%" }}>
        <Row style={{ borderBottom: "1px solid #00000015", width: "100%" }}>
          <div style={{ padding: "24px", width: "100%" }}>
            <Col className="prev-travel-title" span={24}>
              {props.travelHistory.title} ({props.travelHistory.distance})
            </Col>
            <Col className="prev-travel-date" span={24}>
              <span>{props.travelHistory.date}</span>{" "}
              <span className="time">{props.travelHistory.time}</span>
            </Col>
            <Row style={{ width: "100%" }}>
              <Col className="prev-travel-price" span={12}>
                Fiyat: <span className="price">{props.travelHistory.price}</span>
              </Col>
              <Col
                onClick={() => {
                  props.setShowDetails(true);
                  props.setDetailInfos({
                    historyDetails
                  });
                }}
                className="prev-travel-details"
                span={12}
                style={{ textAlign: "end" }}
              >
                Detaylar <RightOutlined />
              </Col>
            </Row>
          </div>
        </Row>
        <Row style={{ padding: "24px" }}>
          <Col span={24}>
            <Row>
              <CheckOutlined style={{ fontSize: "16px" }} />
              <Col className="prev-travel-status">{props.travelHistory.status}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
