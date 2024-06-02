import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Spin } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import config from "../../config";
import api from "../../utils/api";

const initialCountdown = 3;

export default function LoadingModal({
  isModalOpen,
  setIsModalOpen,
  destination,
  distance,
  source,
  t,
  taxiBooking,
  socket,
  user
}) {
  const [isDriverFound, setIsDriverFound] = React.useState(false);
  const { travel, setTravel, height } = React.useContext(GlobalContext);
  const [countdown, setCountdown] = useState(initialCountdown);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDriverFound) {
      setTravel({
        name: "Yavuzhan Albayrak",
        surname: "Albayrak",
        email: "yavuzalbayrak@gmail.com",
        phone: "+90 539 202 61 05",
        car: {
          brand: "Honda",
          model: "pcx",
          year: "2021",
        },
        rating: 3,
        destination,
        distance,
        source,
        price: parseInt(distance.match(/\d+/)[0]) * 10,
        currency: "TRY",
      });
      // Start the countdown timer when the component mounts
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [isDriverFound]);

  //Search Example
  useEffect(() => {
    if(isModalOpen==true && taxiBooking) {
    api.post(`${config.urls.findDriver}/${taxiBooking.id}`).then((response) => {
      console.log(response.data);
      response.data.forEach((res) => {
        console.log("taxibooooking",taxiBooking);
        socket.emit("privateMessage", { message: {taxiBooking,user}, toUserId: res.driver.user.id });

      });

      //setIsDriverFound(true)
    });
  }
  }, [isModalOpen, taxiBooking]);

  return (
    <div>
      <Modal
        title={
          isDriverFound ? t("loadingmodal.found") : t("loadingmodal.searching")
        }
        open={isModalOpen}
        closeIcon={false}
        footer={false}
        style={{ paddingTop: `${height / 5}px` }}
      >
        {!isDriverFound ? (
          <Row
            gutter={[0, 25]}
            style={{ textAlign: "center", paddingTop: "10px" }}
          >
            <Col span={24}>
              {t("loadingmodal.wait")}
              <Col span={24} style={{ paddingTop: "10px" }}>
                <LoadingOutlined style={{ fontSize: "24px" }} />
              </Col>
            </Col>

            <Col span={24}>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsDriverFound(false);
                }}
                style={{ width: "30%" }}
                danger
                type="primary"
              >
                {t("homepage.cancel")}
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
                <p>{t("loadingmodal.driverfound")}</p>
                {/* <p>{countdown}</p> */}
                <p style={{ display: "none" }}>
                  {setTimeout(() => {
                    navigate("/travel");
                  }, 2000)}
                </p>
              </>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
}
