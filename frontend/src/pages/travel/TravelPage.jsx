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
  LeftOutlined,
  CaretLeftOutlined,
  LeftCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/buttons/primaryButton";
import AreUSureModal from "../../components/AreYouSureModal";
import { useNavigate } from "react-router-dom";
import PreviousTravelCard from "../../components/travel/PreviousTravelCard";
import Field from "../../components/field/Field";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function TravelPage({ locationName }) {
  const { setSelectedKeys, isPhone, height, travel, setTravel } =
    React.useContext(GlobalContext);

  const totalStars = 5;
  const filledStars = Math.max(0, Math.min(travel?.rating || 0, totalStars));
  const emptyStars = totalStars - filledStars;
  const [isTravelFinished, setIsTravelFinished] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [detailInfos, setDetailInfos] = React.useState(false);
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
  const { name, surname, email, phone, car } = travel || {};
  const user = useAuthUser();

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
    if (travel) {
      handleFutureTravel();
    }
  }, []);

  const handleStarClick = (index) => {
    setDriverRate(index + 1);
  };

  const currencyList = [
    {
      value: "TRY",
      ad: "TRY",
      prefix: "₺",
      thousandSeparator: ".",
      decimalSeparator: ",",
      decimalDigits: 2,
    },
    {
      value: "USD",
      ad: "USD",
      prefix: "$",
      thousandSeparator: ",",
      decimalSeparator: ".",
      decimalDigits: 2,
    },
    {
      value: "EUR",
      ad: "EUR",
      prefix: "€",
      thousandSeparator: ".",
      decimalSeparator: ",",
      decimalDigits: 2,
    },
  ];

  const prevTravels = [
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "120",
      status: "Tamamlandı",
    },
    {
      title: "Sakarya - Mavi Durak",
      distance: "7.3 Km",
      date: "13.08.2023",
      time: "19.15",
      price: "569",
      status: "Tamamlandı",
    },
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "200",
      status: "Tamamlandı",
    },
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "200",
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
              style={
                isPhone && { borderRadius: "0px", backgroundColor: "#f9f9f9" }
              }
            >
              <div
                style={{
                  minHeight: `calc(${height}px - 114px)`,
                }}
              >
                {showDetails ? (
                  <div className="driver-infos">
                    <Button
                      ghost
                      type="primary"
                      onClick={() => {
                        setShowDetails(false);
                      }}
                      style={{ marginBottom: "10px" }}
                    >
                      <LeftCircleFilled /> Geri Dön
                    </Button>
                    <Col style={{ marginTop: "15px" }} span={24}>
                      <h2>Yolculuk Bilgileri</h2>
                    </Col>
                    <Field
                      title={"Durum"}
                      field={detailInfos.historyDetails.status}
                      type="success"
                    />
                    <Field
                      title={"Başlangıç Noktası"}
                      field={travel?.source?.label || "Konumunuz"}
                      titleSpan={8}
                      fieldSpan={16}
                    />

                    <Field
                      title={"Varış Noktası"}
                      field={detailInfos.historyDetails.title}
                      titleSpan={8}
                      fieldSpan={16}
                    />
                    <Field
                      title={"Mesafe"}
                      field={detailInfos.historyDetails.distance}
                      titleSpan={8}
                      fieldSpan={16}
                    />
                    <Field
                      title={"Tarih"}
                      field={`${detailInfos.historyDetails.date} / ${detailInfos.historyDetails.time}`}
                      titleSpan={8}
                      fieldSpan={16}
                    />
                    <Field
                      title={"Fiyat"}
                      field={() => {
                        const currency = currencyList.find(
                          (item) =>
                            item.value === detailInfos.historyDetails.currency
                        );
                        const formattedPaymentRate = `${
                          currency.prefix
                        } ${detailInfos.historyDetails.price.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: currency.decimalDigits,
                            maximumFractionDigits: currency.decimalDigits,
                          }
                        )}`;
                        return <p>{formattedPaymentRate}</p>;
                      }}
                    />
                    <Col span={24}></Col>
                    <Col style={{ marginTop: "15px" }} span={24}>
                      <h2>Sürücü Bilgileri</h2>
                    </Col>
                    <Field
                      title={"Adı"}
                      field={detailInfos.historyDetails.name}
                      titleSpan={8}
                      fieldSpan={16}
                    />
                    <Field
                      title={"Telefon Numarası"}
                      field={detailInfos.historyDetails.phone}
                      titleSpan={12}
                      fieldSpan={12}
                    />
                    <Field
                      title={"Puan"}
                      field={
                        <>
                          {[...Array(detailInfos.historyDetails.rating)].map(
                            (_, index) => (
                              <StarFilled
                                style={{ color: "#ffc800" }}
                                key={index}
                              />
                            )
                          )}
                          {[
                            ...Array(5 - detailInfos.historyDetails.rating),
                          ].map((_, index) => (
                            <StarOutlined key={index} />
                          ))}
                        </>
                      }
                    />

                    <Col style={{ marginTop: "15px" }} span={24}>
                      <h2>Araç Bilgileri</h2>
                    </Col>
                    <Field
                      title={"Marka"}
                      field={detailInfos.historyDetails.car?.brand}
                    />
                    <Field
                      title={"Model"}
                      field={detailInfos.historyDetails.car?.model}
                    />
                    <Field
                      title={"Yıl"}
                      field={detailInfos.historyDetails.car?.year}
                    />
                  </div>
                ) : (
                  <div>
                    <Col
                      span={24}
                      style={{
                        textAlign: isPhone ? "center" : "end",
                        marginBottom: "24px",
                      }}
                    >
                      <Button
                        style={{
                          borderRadius: " 8px 0 0 8px ",
                          backgroundColor: futureTravel ? "#1890ff" : "#f0f0f0",
                          color: futureTravel ? "#fff" : "#000",
                          width: "150px",
                        }}
                        onClick={() => handleFutureTravel()}
                      >
                        Aktif Yolculuk
                      </Button>
                      <Button
                        style={{
                          borderRadius: " 0 8px 8px 0",
                          backgroundColor: travelHistory
                            ? "#1890ff"
                            : "#f0f0f0",
                          color: travelHistory ? "#fff" : "#000",
                          width: "150px",
                        }}
                        onClick={() => handleTravelHistory()}
                      >
                        {" "}
                        Geçmiş Yolculuklar
                      </Button>
                    </Col>
                    <Row gutter={[0, 5]}>
                      {futureTravel ? (
                        <>
                          {travel ? (
                            <>
                              {isTravelFinished ? (
                                <Row style={{ width: "100%" }} gutter={[0, 0]}>
                                  <Col span={24}>
                                    <Col
                                      span={24}
                                      style={{ textAlign: "center" }}
                                    >
                                      <p style={{ fontSize: "20px" }}>
                                        Sürücüyü Puanla
                                      </p>

                                      <div>
                                        {[...Array(totalStars)].map(
                                          (_, index) => (
                                            <Tooltip
                                              key={index}
                                              title={index + 1}
                                            >
                                              <button
                                                className="rate-stars"
                                                onClick={() =>
                                                  handleStarClick(index)
                                                }
                                              >
                                                {index < driverRate ? (
                                                  <StarFilled className="star-filled" />
                                                ) : (
                                                  <StarOutlined className="star-out-lined" />
                                                )}
                                              </button>
                                            </Tooltip>
                                          )
                                        )}
                                      </div>
                                    </Col>
                                    <Col
                                      style={{ padding: "16px 0px" }}
                                      span={24}
                                    >
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
                                        style={{
                                          width: "100%",
                                          marginTop: "10px",
                                        }}
                                      >
                                        Geri Dön
                                      </Button>
                                    </Col>
                                  </Col>
                                </Row>
                              ) : (
                                <div
                                  style={{
                                    width: "100%",
                                    marginBottom: "16px",
                                  }}
                                >
                                  <Row
                                    className="driver-infos"
                                    gutter={[16, 0]}
                                  >
                                    <Col span={24}>
                                      <h2>Yolculuk Bilgileri</h2>
                                    </Col>
                                    <Field
                                      title={"Başlangıç Noktası"}
                                      field={
                                        travel?.source?.label || locationName
                                      }
                                      titleSpan={8}
                                      fieldSpan={16}
                                    />
                                    <Field
                                      title={"Varış Noktası"}
                                      field={travel.destination.label}
                                      titleSpan={8}
                                      fieldSpan={16}
                                    />
                                    <Field
                                      title={"Mesafe"}
                                      field={travel.distance}
                                    />
                                    <Field
                                      title={"Fiyat"}
                                      field={() => {
                                        const currency = currencyList.find(
                                          (item) =>
                                            item.value === travel.currency
                                        );
                                        const formattedPaymentRate = `${
                                          currency.prefix
                                        } ${travel.price.toLocaleString(
                                          undefined,
                                          {
                                            minimumFractionDigits:
                                              currency.decimalDigits,
                                            maximumFractionDigits:
                                              currency.decimalDigits,
                                          }
                                        )}`;
                                        return <p>{formattedPaymentRate}</p>;
                                      }}
                                    />
                                    <Col
                                      style={{ marginTop: "15px" }}
                                      span={24}
                                    >
                                      <h2>Sürücü Bilgileri</h2>
                                    </Col>
                                    <Field
                                      title={"Adı"}
                                      field={travel.name}
                                      titleSpan={8}
                                      fieldSpan={16}
                                    />
                                    <Field
                                      title={"Telefon Numarası"}
                                      field={travel.phone}
                                      fieldSpan={12}
                                      titleSpan={12}
                                    />

                                    <Field
                                      title={"Puan"}
                                      field={
                                        <>
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
                                        </>
                                      }
                                    />

                                    <Col
                                      style={{ marginTop: "15px" }}
                                      span={24}
                                    >
                                      <h2>Araç Bilgileri</h2>
                                    </Col>
                                    <Field title={"Marka"} field={car?.brand} />
                                    <Field title={"Model"} field={car?.model} />
                                    <Field title={"Yıl"} field={car?.year} />
                                  </Row>
                                  <Row
                                    style={{
                                      width: "100%",
                                      paddingTop: "32px",
                                    }}
                                  >
                                    <Col span={24}>
                                      <Row gutter={[0, 10]}>
                                        <Col span={24}>
                                          <Button
                                            type="primary"
                                            size="large"
                                            onClick={() =>
                                              setIsTravelFinished(true)
                                            }
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
                                  {user.role === "user"?
                                    <>
                                      <Col
                                        style={{ fontSize: "30px" }}
                                        span={24}
                                      >
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
                                    </>
                                    :
                                    <>
                                    <Col
                                        style={{ fontSize: "30px" }}
                                        span={24}
                                      >
                                        <UserOutlined />
                                      </Col>

                                      <Col span={24}>
                                        <Link to="/">
                                          <Button>
                                            {" "}
                                            <LeftCircleOutlined /> Yolcu Bul{" "}
                                          </Button>
                                        </Link>
                                      </Col>
                                    </>
                                  }
                                </Card>
                              </Row>
                            </>
                          )}
                        </>
                      ) : (
                        <div style={{ width: "100%" }}>
                          {prevTravels.map((travelHistory, index) => {
                            return (
                              <div key={index} style={{ marginBottom: "16px" }}>
                                <PreviousTravelCard
                                  setDetailInfos={setDetailInfos}
                                  setShowDetails={setShowDetails}
                                  travelHistory={travelHistory}
                                  driverHistory={travel}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </Row>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
      <AreUSureModal
        title={"Yolculuğu sonlandırmak istediğinize emin misiniz?"}
        description={""}
        onOkModal={() => {
          setTravel(false);
          navigate("/");
        }}
        isModalOpen={open}
        setIsModalOpen={setOpen}
        loading={false}
      ></AreUSureModal>
    </Row>
  );
}
