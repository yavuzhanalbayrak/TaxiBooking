import React from "react";
import GlobalContext from "../../context/GlobalContext";
import { Button, Card, Col, Row, Tooltip } from "antd";
import Stripe from "../../api/Stripe";
import {
  LeftCircleOutlined,
  CarOutlined,
  StarOutlined,
  StarFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/buttons/primaryButton";

export default function TravelPage() {
  const { setSelectedKeys, isPhone, height, driver } =
    React.useContext(GlobalContext);

  const totalStars = 5;
  const filledStars = Math.max(0, Math.min(driver?.rating || 0, totalStars));
  const emptyStars = totalStars - filledStars;
  const [isTravelFinished, setIsTravelFinished] = React.useState(false);
  const [driverRate, setDriverRate] = React.useState(
    Math.max(0, Math.min(0, totalStars))
  );
  const [emptyStarsForDriverRate, setEmptyStarsForDriverRate] = React.useState(
    Math.max(0, Math.min(5, totalStars))
  );
  const { name, surname, email, phone, car } = driver || {};

  React.useEffect(() => {
    setSelectedKeys(["2"]);
  }, []);

  const handleStarClick = (index) => {
    setDriverRate(index + 1);
  };

  return (
    <Row
      style={
        isPhone && { height: `calc(${height}px - 64px)`, overflowY: "auto" }
      }
      align="middle"
    >
      <Col span={24}>
        <Row justify="center">
          <Col span={isPhone ? 24 : 16}>
            <Card
              title={
                !isPhone && (
                  <div style={{ textAlign: "center" }}>
                    {driver ? (
                      isTravelFinished ? (
                        <div>
                          <CheckCircleOutlined
                            style={{
                              fontSize: "24px",
                              color: "green",
                              paddingTop: "20px",
                            }}
                          />
                          <p style={{ paddingBottom: "20px" }}>
                            Yolculuk Tamamlandı
                          </p>
                        </div>
                      ) : (
                        "Yolculuk Bilgileri"
                      )
                    ) : (
                      "Henüz Bir Yolculuk Başlatmadınız!"
                    )}
                  </div>
                )
              }
              style={isPhone && { borderRadius: "0px" }}
            >
              {driver ? (
                <Row
                  style={{ minHeight: `calc(${height}px - 114px)` }}
                  gutter={[0, 5]}
                >
                  {isTravelFinished ? (
                    <Row style={{ width: "100%" }} gutter={[0, 0]}>
                      <Col span={24}>
                        <Col span={24} style={{ textAlign: "center" }}>
                          <p style={{ fontSize: "20px" }}>Sürücüyü Puanla</p>

                          <div>
                            {[...Array(totalStars)].map((_, index) => (
                              <Tooltip key={index} title={index + 1}>
                                <button
                                  className="rate-stars"
                                  onClick={() => handleStarClick(index)}
                                >
                                  {index < driverRate ? (
                                    <StarFilled className="star-filled" />
                                  ) : (
                                    <StarOutlined className="star-out-lined" />
                                  )}
                                </button>
                              </Tooltip>
                            ))}
                          </div>
                        </Col>
                        <Col style={{ padding: "16px 0px" }} span={24}>
                          <h2>Ödeme Bilgileri</h2>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                          <Stripe
                            amount={100}
                            currency={"usd"}
                            mode={"payment"}
                          />{" "}
                          <Button size="large" danger type="primary" onClick={()=>{setIsTravelFinished(false)}} style={{width:"100%",marginTop:"10px"}}>Geri Dön</Button>
                        </Col>
                      </Col>
                    </Row>
                  ) : (
                    <div style={{ width: "100%", marginBottom: "16px" }}>
                      <Row className="driver-infos" gutter={[16, 16]}>
                        <Col span={24}>
                          <h2>Sürücü Bilgileri</h2>
                        </Col>
                        <Col span={24}>
                          <Card style={{backgroundColor:"#f9f9f9"}}>
                            <Row>
                              <Col span={16}>
                                <strong>Adı</strong>
                              </Col>
                              <Col span={8}>{name}</Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <Card style={{backgroundColor:"#f9f9f9"}}>
                            <Row>
                              <Col span={16}>
                                <strong>Soyadı</strong>
                              </Col>
                              <Col span={8}>{surname}</Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <Card style={{backgroundColor:"#f9f9f9"}}>
                            <Row>
                              <Col span={16}>
                                <strong>Telefon Numarası</strong>
                              </Col>
                              <Col span={8}>{phone}</Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <Card style={{backgroundColor:"#f9f9f9"}}>
                            <Row>
                              <Col span={16}>
                                <strong>Puanı</strong>
                              </Col>
                              <Col span={8}>
                                {[...Array(filledStars)].map((_, index) => (
                                  <StarFilled
                                    style={{ color: "#ffc800" }}
                                    key={index}
                                  />
                                ))}
                                {[...Array(emptyStars)].map((_, index) => (
                                  <StarOutlined key={index} />
                                ))}
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <h2>Araç Bilgileri</h2>
                        </Col>
                        <Col span={24}>
                          <Card style={{backgroundColor:"#f9f9f9"}}>
                            <Row>
                              <Col span={16}>
                                <strong>Marka</strong>
                              </Col>
                              <Col span={8}>{car?.brand}</Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <Card style={{backgroundColor:"#f9f9f9"}}>
                            <Row>
                              <Col span={16}>
                                <strong>Model</strong>
                              </Col>
                              <Col span={8}>{car?.model}</Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col span={24}>
                          <Card style={{backgroundColor:"#f9f9f9"}}>
                            <Row>
                              <Col span={16}>
                                <strong>Yıl</strong>
                              </Col>
                              <Col span={8}>{car?.year}</Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                      <Row style={{ width: "100%",paddingTop:"32px" }}>
                        <Col span={24} >
                          <Row gutter={[0, 10]}>
                            <Col span={24}>
                              <Button
                                type="primary"
                                size="large"
                                onClick={() => setIsTravelFinished(true)}
                                style={{
                                  width: "100%",
                                  borderRadius: "25px",
                                }}
                              >
                                Yolculuğu Tamamla
                              </Button>
                            </Col>
                            <Col span={24}>
                              <Button
                                danger
                                type="primary"
                                size="large"
                                style={{
                                  width: "100%",
                                  borderRadius: "25px",
                                }}
                              >
                                İptal Et
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  )}
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
      </Col>
    </Row>
  );
}
