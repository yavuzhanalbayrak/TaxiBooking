import { useState, useEffect } from "react";
import loginImage from "../images/Taxi.jpg";
import { Row, Col } from "antd";
import "./style.scss";

// eslint-disable-next-line react/prop-types
function Login({ children }) {
  return (
    <>
      <Row justify="center" align="middle"
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.95)), url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment:"fixed",
          position:"sticky",
          paddingTop:"32px",
          paddingBottom:"32px",
        }}
      >
        <Col
          style={{
            backgroundColor: "#ffffffa2",
            borderRadius: "36px",
            padding:"32px",
            height:"auto",
          }}
          xxl={7}
          xl={8}
          lg={10}
          md={14}
          sm={16}
          xs={22}
        >
          <Row justify="center">
            <Col span={24}>{children}</Col>
          </Row>{" "}
        </Col>
      </Row>
    </>
  );
}

export default Login;
