import { Card, Col, Row, Input } from "antd";
import React from "react";
import "../travel/travelStyle.scss";

export default function Field(props) {
  return (
    <Col span={24} style={{ margin: "5px 0px" }}>
      <Card>
        <Row>
          <Col className="title" span={props.titleSpan || 16}>
            {props.title}
          </Col>
          <Col
            className="field"
            span={props.fieldSpan || 8}
            style={{ color: props.type === "success" ? "#00bb00" : undefined }}
          >
            {props.edit ? (
              <Input
                value={props.fieldValue?.[props.value]}
                onChange={(e) =>
                  props.onFieldChange((prevstate) => ({
                    ...prevstate,
                    [props.value]: e.target.value,
                  }))
                }
              />
            ) : typeof props.field === "function" ? (
              props.field()
            ) : (
              props.field
            )}
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
