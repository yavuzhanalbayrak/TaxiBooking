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
import AreUSureModal from "../../components/AreYouSureModal";
import { useNavigate } from "react-router-dom";
import PreviousTravelCard from "../../components/travel/PreviousTravelCard";

export default function TravelPage() {
  const { setSelectedKeys, isPhone, height, driver, setDriver } =
    React.useContext(GlobalContext);

  const totalStars = 5;
  const filledStars = Math.max(0, Math.min(driver?.rating || 0, totalStars));
  const emptyStars = totalStars - filledStars;
  const [isTravelFinished, setIsTravelFinished] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [driverRate, setDriverRate] = React.useState(
    Math.max(0, Math.min(0, totalStars))
  );
  const navigate = useNavigate();
  const [emptyStarsForDriverRate, setEmptyStarsForDriverRate] = React.useState(
    Math.max(0, Math.min(5, totalStars))
  );
  const [futureTravel, setFutureTravel] = React.useState(false);
  const [travelHistory, setTravelHistory] = React.useState(true);
  const { name, surname, email, phone, car } = driver || {};

  const handleFutureTravel = () => {
    setFutureTravel(true);
    setTravelHistory(false);
  };

  const handleTravelHistory = () => {
    setFutureTravel(false);
    setTravelHistory(true);
  };

  React.useEffect(() => {
    setSelectedKeys(["2"]);
    if (driver) {
      handleFutureTravel();
    }
  }, []);

  const handleStarClick = (index) => {
    setDriverRate(index + 1);
  };

  const prevTravels = [
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "200 TL",
      status: "Tamamlandı",
    },
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "200 TL",
      status: "Tamamlandı",
    },
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "200 TL",
      status: "Tamamlandı",
    },
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "200 TL",
      status: "Tamamlandı",
    },
  ];

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
              style={
                isPhone && { borderRadius: "0px", backgroundColor: "#f9f9f9" }
              }
            >
              <Col span={24} style={{ textAlign: "end" }}>
                <Button
                  style={{
                    borderRadius: " 8px 0 0 8px ",
                    backgroundColor: futureTravel ? "#1890ff" : "#f0f0f0",
                    color: futureTravel ? "#fff" : "#000",
                  }}
                  onClick={() => handleFutureTravel()}
                >
                  Aktif Yolculuk
                </Button>
                <Button
                  style={{
                    borderRadius: " 0 8px 8px 0",
                    backgroundColor: travelHistory ? "#1890ff" : "#f0f0f0",
                    color: travelHistory ? "#fff" : "#000",
                  }}
                  onClick={() => handleTravelHistory()}
                >
                  {" "}
                  Geçmiş Yolculuklar
                </Button>
              </Col>
              <Row
                style={{
                  minHeight: `calc(${height}px - 146px)`,
                  padding: "24px 0px",
                }}
                gutter={[0, 5]}
              >
                {futureTravel ? (
                  <>
                    {driver ? (
                      <>
                        {isTravelFinished ? (
                          <Row style={{ width: "100%" }} gutter={[0, 0]}>
                            <Col span={24}>
                              <Col span={24} style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "20px" }}>
                                  Sürücüyü Puanla
                                </p>

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
                                <Button
                                  size="large"
                                  danger
                                  type="primary"
                                  onClick={() => {
                                    setIsTravelFinished(false);
                                  }}
                                  style={{ width: "100%", marginTop: "10px" }}
                                >
                                  Geri Dön
                                </Button>
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
                                <Card>
                                  <Row>
                                    <Col span={16}>
                                      <strong>Adı</strong>
                                    </Col>
                                    <Col span={8}>{name}</Col>
                                  </Row>
                                </Card>
                              </Col>
                              <Col span={24}>
                                <Card>
                                  <Row>
                                    <Col span={16}>
                                      <strong>Soyadı</strong>
                                    </Col>
                                    <Col span={8}>{surname}</Col>
                                  </Row>
                                </Card>
                              </Col>
                              <Col span={24}>
                                <Card>
                                  <Row>
                                    <Col span={16}>
                                      <strong>Telefon Numarası</strong>
                                    </Col>
                                    <Col span={8}>{phone}</Col>
                                  </Row>
                                </Card>
                              </Col>
                              <Col span={24}>
                                <Card>
                                  <Row>
                                    <Col span={16}>
                                      <strong>Puanı</strong>
                                    </Col>
                                    <Col span={8}>
                                      {[...Array(filledStars)].map(
                                        (_, index) => (
                                          <StarFilled
                                            style={{ color: "#ffc800" }}
                                            key={index}
                                          />
                                        )
                                      )}
                                      {[...Array(emptyStars)].map(
                                        (_, index) => (
                                          <StarOutlined key={index} />
                                        )
                                      )}
                                    </Col>
                                  </Row>
                                </Card>
                              </Col>
                              <Col span={24}>
                                <h2>Araç Bilgileri</h2>
                              </Col>
                              <Col span={24}>
                                <Card>
                                  <Row>
                                    <Col span={16}>
                                      <strong>Marka</strong>
                                    </Col>
                                    <Col span={8}>{car?.brand}</Col>
                                  </Row>
                                </Card>
                              </Col>
                              <Col span={24}>
                                <Card>
                                  <Row>
                                    <Col span={16}>
                                      <strong>Model</strong>
                                    </Col>
                                    <Col span={8}>{car?.model}</Col>
                                  </Row>
                                </Card>
                              </Col>
                              <Col span={24}>
                                <Card>
                                  <Row>
                                    <Col span={16}>
                                      <strong>Yıl</strong>
                                    </Col>
                                    <Col span={8}>{car?.year}</Col>
                                  </Row>
                                </Card>
                              </Col>
                            </Row>
                            <Row style={{ width: "100%", paddingTop: "32px" }}>
                              <Col span={24}>
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
                                      onClick={() => setOpen(true)}
                                    >
                                      İptal Et
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <Row style={{ width: "100%" }}>
                          <Card
                            style={{
                              height: "150px",
                              textAlign: "center",
                              width: "100%",
                            }}
                          >
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
                          </Card>
                        </Row>
                      </>
                    )}
                  </>
                ) : (
                  <div style={{ width: "100%" }}>
                    {prevTravels.map((travelHistory, index) => {
                      return (
                        <div key={index} style={{marginBottom:"16px"}}>
                          <PreviousTravelCard
                            title={travelHistory.title}

                            distance={travelHistory.distance}
                            date={travelHistory.date}
                            time={travelHistory.time}
                            price={travelHistory.price}
                            status={travelHistory.status}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
      <AreUSureModal
        title={"Yolculuğu sonlandırmak istediğinize emin misiniz?"}
        description={""}
        onOkModal={() => {
          setDriver(false);
          navigate("/");
        }}
        isModalOpen={open}
        setIsModalOpen={setOpen}
        loading={false}
      ></AreUSureModal>
    </Row>
  );
}
