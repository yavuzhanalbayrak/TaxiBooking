import { useState, useEffect } from "react";
import loginImage from "../images/Taxi.jpg";
import { Row, Col } from "antd";
import "./style.scss";

// eslint-disable-next-line react/prop-types
function Login({ children }) {
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.95)), url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Col
          style={{
            backgroundColor: "#ffffffa2",
            padding: "64px",
            borderRadius: "36px",
          }}
          xxl={7}
          xl={8}
          lg={10}
          md={14}
          sm={16}
          xs={20}
        >
          <Row justify="center" align="middle">
            <Col>{children}</Col>
          </Row>{" "}
        </Col>
      </Row>
    </>
  );
}

export default Login;
