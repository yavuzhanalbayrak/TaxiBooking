import React from "react";
import GlobalContext from "../../context/GlobalContext";
import { Button, Card, Col, Row } from "antd";
import Stripe from "../../api/Stripe";
import {
  LeftCircleOutlined,
  CarOutlined,
  StarOutlined,
  StarFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function TravelPage() {
  const { setSelectedKeys, isPhone, height, driver } =
    React.useContext(GlobalContext);

  const totalStars = 5;
  const filledStars = Math.max(0, Math.min(driver?.rating || 0, totalStars));
  const emptyStars = totalStars - filledStars;
  const [isTravelFinished, setIsTravelFinished] = React.useState(true);
  const [driverRate, setDriverRate] = React.useState(
    Math.max(0, Math.min(0, totalStars))
  );
  const [emptyStarsForDriverRate, setEmptyStarsForDriverRate] = React.useState(
    Math.max(0, Math.min(5, totalStars))
  );

  React.useEffect(() => {
    setSelectedKeys(["2"]);
  }, []);

  return (
    <Row style={{ height: `calc(100vh - 100px)` }} align="middle">
      <Col span={24}>
        <Row justify="center">
          <Col span={22}>
            <Card
              title={
                <div style={{ textAlign: "center" }}>
                  {driver
                    ? isTravelFinished?<div>
                      <CheckCircleOutlined
                        style={{ fontSize: "24px", color: "green",paddingTop:"20px" }}
                      />
                      <p style={{paddingBottom:"20px"}}>Yolculuk Tamamlandı</p>
                    </div>:"Yolculuk Bilgileri"
                    : "Henüz Bir Yolculuk Başlatmadınız!"}
                </div>
              }
              style={{ width: "100%" }}
            >
              {driver ? (
                <Row gutter={[0, 5]}>
                  {isTravelFinished && (
                    <Col span={24} style={{ textAlign: "center" }}>
                     
                      <p style={{fontSize:"20px"}}>Sürücüyü Puanla</p>
                        
                      <p style={{ paddingBottom: "20px", fontSize:"30px" }}>
                        {[...Array(driverRate)].map((_, index) => (
                          <StarFilled
                            onClick={() => {
                              setDriverRate(index + 1);
                              setEmptyStarsForDriverRate(
                                totalStars - (index + 1)
                              );
                            }}
                            style={{ color: "#ffc800" }}
                            key={index}
                          />
                        ))}
                        {[...Array(emptyStarsForDriverRate)].map((_, index) => (
                          <StarOutlined
                            onClick={() => {
                              setDriverRate(
                                (prevState) => prevState + index + 1
                              );
                              setEmptyStarsForDriverRate(
                                emptyStarsForDriverRate - (index + 1)
                              );
                            }}
                            key={index}
                          />
                        ))}
                      </p>
                     
                    </Col>
                  )}
                  <Col span={24}>Adı: {driver?.name}</Col>
                  <Col span={24}>Soyadı: {driver?.surname}</Col>
                  <Col span={24}>E-Postası: {driver?.email}</Col>
                  <Col span={24}>Telefon Numarası: {driver?.phone}</Col>
                  <Col span={24}>Araç Markası: {driver?.car.band}</Col>
                  <Col span={24}>Araç Modeli: {driver?.car.model}</Col>
                  <Col span={24}>Araç Yılı: {driver?.car.year}</Col>
                  <Col span={24}>
                    <span>
                      Puan:{" "}
                      {[...Array(filledStars)].map((_, index) => (
                        <StarFilled style={{ color: "#ffc800" }} key={index} />
                      ))}
                      {[...Array(emptyStars)].map((_, index) => (
                        <StarOutlined key={index} />
                      ))}
                    </span>
                  </Col>
                  <Col span={24} style={{ paddingTop: "20px" }}>
                    {isTravelFinished ? (
                      <Col span={24} style={{ textAlign: "center" }}>
                        <Button style={{ width: "100%", height:"40px" }}>Ödeme Yap</Button>
                      </Col>
                    ) : (
                      <Button style={{ width: "100%" }}>İptal Et</Button>
                    )}
                  </Col>
                </Row>
              ) : (
                <Row style={{ textAlign: "center" }}>
                  <Col style={{ fontSize: "30px" }} span={24}>
                    <CarOutlined />
                  </Col>

                  <Col span={24}>
                    <Link to="/">
                      <Button>
                        {" "}
                        <LeftCircleOutlined /> Araç Bul{" "}
                      </Button>
                    </Link>
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
        </Row>

        {/* <Stripe amount={100} currency={'usd'} mode={'payment'}/> */}
      </Col>
    </Row>
  );
}
