import { Card, Col, Row } from "antd";
import React from "react";
import "../travel/travelStyle.scss";

export default function Field(props) {
  return (
    <Col span={24} style={{ margin: "10px 0px" }}>
      <Card>
        <Row>
          <Col className="title" span={props.titleSpan || 16}>
            {props.title}
          </Col>
          <Col
            className="field"
            span={props.fieldSpan || 8}
            style={{ color: props.type == "success" && "#00bb00" }}
          >
            {props.field}
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
