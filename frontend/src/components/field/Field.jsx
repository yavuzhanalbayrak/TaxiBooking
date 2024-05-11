import { Card, Col, Row } from "antd";
import React from "react";

export default function Field(props) {
  return (
    <Col span={24}>
      <Card>
        <Row>
          <Col className="title" span={16}>
            {props.title}
          </Col>
          <Col className="field" span={8}>
            {props.field}
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
