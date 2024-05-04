import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Spin } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const initialCountdown = 3;

export default function LoadingModal({ isModalOpen, setIsModalOpen }) {
  const [isDriverFound, setIsDriverFound] = React.useState(false);
  const [countdown, setCountdown] = useState(initialCountdown);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDriverFound) {
      // Start the countdown timer when the component mounts
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [isDriverFound]);

  //Example
  useEffect(() => {
    setIsDriverFound(false);
    setCountdown(initialCountdown);

    if (isModalOpen) {
      setTimeout(() => {
        setIsDriverFound(true);
      }, 1500);
    }
  }, [isModalOpen]);

  return (
    <div>
      <Modal
        title={isDriverFound?"Sürücü Bulundu":"Sürücü Aranıyor"}
        open={isModalOpen}
        closeIcon={false}
        footer={false}
        style={{ paddingTop: "25vh" }}
      >
        {!isDriverFound ? (
          <Row
            gutter={[0, 25]}
            style={{ textAlign: "center", paddingTop: "10px" }}
          >
            <Col span={24}>
              Lütfen Bekleyiniz
              <Col span={24} style={{ paddingTop: "10px" }}>
                <LoadingOutlined style={{ fontSize: "24px" }} />
              </Col>
            </Col>

            <Col span={24}>
              <Button
                onClick={() => setIsModalOpen(false)}
                style={{ width: "30%" }}
                danger
                type="primary"
              >
                İptal
              </Button>
            </Col>
          </Row>
        ) : (
          <Row
            gutter={[0, 25]}
            style={{ textAlign: "center", paddingTop: "10px" }}
          >
            <Col span={24}>
              <>
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: "green" }}
                />
                <p>Şoför bulundu. Yolculuk başlıyor...</p>
                <p>{countdown}</p>
                <p style={{ display: "none" }}>
                  {setTimeout(() => {
                    navigate("/travel");
                  }, 3000)}
                </p>
              </>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
}
