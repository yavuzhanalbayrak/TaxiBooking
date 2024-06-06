import React, { useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Button, Card, Col, Row, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
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
  CheckOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/buttons/primaryButton";
import AreUSureModal from "../../components/AreYouSureModal";
import { useNavigate } from "react-router-dom";
import PreviousTravelCard from "../../components/travel/PreviousTravelCard";
import Field from "../../components/field/Field";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import api from "../../utils/api";
import { toast } from "react-toastify";
import config from "../../config";

export default function TravelPage({
  locationName,
  setPerson,
  setSource,
  setDestination,
  setIsPersonApproved,
  socket,
  travel,
  setTravel,
  taxibooking,
}) {
  const { setSelectedKeys, isPhone, height } = React.useContext(GlobalContext);
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
  const { t } = useTranslation();
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

  //EXAMPLE PREV
  const prevTravels = [
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "120",
      status: "completed",
    },
    {
      title: "Sakarya - Mavi Durak",
      distance: "7.3 Km",
      date: "13.08.2023",
      time: "19.15",
      price: "569",
      status: "canceled",
    },
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "200",
      status: "completed",
    },
    {
      title: "Samsun - Atakum",
      distance: "12.3 Km",
      date: "21.08.2002",
      time: "17.02",
      price: "200",
      status: "canceled",
    },
  ];

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const handleSubmitMimic = async () => {
    setIsPaymentLoading(true);
    api
      .post(`${config.urls.paymentCharge}`, {
        currency: "USD",
        amount: 100.0,
        description: "Taxi booking",
        token: "tok_visa",
      })
      .then(async (response) => {
        await api.post(`${config.urls.setTaxiBookingStatus}`, {
          id: taxibooking.id,
          status: "COMPLETED",
        });

        await api.post(`${config.urls.endBooking}`, {
          id: taxibooking.id,
          endTime: new Date(),
          rating: driverRate || null,
        });

        await api
          .get(`${config.urls.taxiBookingGetById}/${taxibooking.id}`)
          .then(async (response) => {
            const driver = await api.get(
              `${config.urls.driver}/${response.data.taxiDriverId}`
            );
            const toUserId = driver.data.user.id;

            socket.emit("completeTravel", {
              message: {
                status: "success",
              },
              toUserId,
            });

            await api.post(`${config.urls.taxiBookingPayment}`, {
              id: taxibooking.id,
              amount: travel.price,
            });

            setTravel("");
            setPerson(null);
            navigate("/");
            setSource("");
            setDestination("");
            setIsPersonApproved(false);
            setIsPaymentLoading(false);

            toast.success("Ödeme Başarılı!");
          });
      })
      .catch((error) => {
        console.log(error);
        setIsPaymentLoading(false);

        toast.error("Ödeme Başarısız!");
      });
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
                      <LeftCircleFilled /> {t("travelpage.back")}
                    </Button>
                    <Col style={{ marginTop: "15px" }} span={24}>
                      <h2>{t("travelpage.travelinfo")}</h2>
                    </Col>
                    <Field
                      title={t("travelpage.status")}
                      field={
                        detailInfos.historyDetails.status == "completed" ? (
                          <p className="completed">
                            {" "}
                            <CheckOutlined style={{ fontSize: "16px" }} />{" "}
                            {t("travelpage.completed")}{" "}
                          </p>
                        ) : (
                          <p className="canceled">
                            {" "}
                            <CloseCircleOutlined
                              style={{ fontSize: "16px" }}
                            />{" "}
                            {t("travelpage.canceled")}{" "}
                          </p>
                        )
                      }
                      type={
                        detailInfos.historyDetails.status == "completed"
                          ? "success"
                          : "danger"
                      }
                    />
                    <Field
                      title={t("travelpage.source")}
                      field={travel?.source?.label || "Konumunuz"}
                      titleSpan={8}
                      fieldSpan={16}
                    />

                    <Field
                      title={t("travelpage.dest")}
                      field={detailInfos.historyDetails.title}
                      titleSpan={8}
                      fieldSpan={16}
                    />
                    <Field
                      title={t("travelpage.distance")}
                      field={detailInfos.historyDetails.distance}
                      titleSpan={8}
                      fieldSpan={16}
                    />
                    <Field
                      title={t("travelpage.date")}
                      field={`${detailInfos.historyDetails.date} / ${detailInfos.historyDetails.time}`}
                      titleSpan={8}
                      fieldSpan={16}
                    />
                    <Field
                      title={t("homepage.price")}
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

                    {user.role == "USER" ? (
                      <>
                        <Col span={24}></Col>
                        <Col style={{ marginTop: "15px" }} span={24}>
                          <h2>{t("travelpage.driverinfo")}</h2>
                        </Col>
                        <Field
                          title={t("profile.fullname")}
                          field={detailInfos.historyDetails.name}
                          titleSpan={8}
                          fieldSpan={16}
                        />
                        <Field
                          title={t("profile.number")}
                          field={detailInfos.historyDetails.phone}
                          titleSpan={12}
                          fieldSpan={12}
                        />
                        <Field
                          title={t("travelpage.rate")}
                          field={
                            <>
                              {[
                                ...Array(detailInfos.historyDetails.rating),
                              ].map((_, index) => (
                                <StarFilled
                                  style={{ color: "#ffc800" }}
                                  key={index}
                                />
                              ))}
                              {[
                                ...Array(5 - detailInfos.historyDetails.rating),
                              ].map((_, index) => (
                                <StarOutlined key={index} />
                              ))}
                            </>
                          }
                        />
                        <Col style={{ marginTop: "15px" }} span={24}>
                          <h2>{t("travelpage.carinfo")}</h2>
                        </Col>
                        <Field
                          title={t("travelpage.brand")}
                          field={detailInfos.historyDetails.car?.brand}
                        />
                        <Field
                          title={t("travelpage.model")}
                          field={detailInfos.historyDetails.car?.model}
                        />
                        <Field
                          title={t("travelpage.year")}
                          field={detailInfos.historyDetails.car?.year}
                        />
                      </>
                    ) : (
                      <>
                        <Col style={{ marginTop: "15px" }} span={24}>
                          <h2>{t("travelpage.passinfo")}</h2>
                          <Field
                            title={t("profile.fullname")}
                            field={"Yavuzhan Albayrak"}
                          ></Field>
                          <Field
                            title={t("profile.number")}
                            field={"+90 234 213 41 23"}
                          ></Field>
                        </Col>
                      </>
                    )}
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
                        {t("travelpage.currenttravel")}
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
                        {t("travelpage.prevtravels")}
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
                                        {t("travelpage.ratedriver")}
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
                                      <h2>{t("travelpage.paymentinfo")}</h2>
                                    </Col>
                                    <Col style={{ textAlign: "center" }}>
                                      <Stripe
                                        t={t}
                                        amount={100.0}
                                        currency={"usd"}
                                        mode={"payment"}
                                      />{" "}
                                      <Button
                                        type="primary"
                                        size="large"
                                        style={{
                                          width: "100%",
                                          marginTop: "20px",
                                        }}
                                        disabled={isPaymentLoading}
                                        onClick={handleSubmitMimic}
                                      >
                                        {isPaymentLoading ? (
                                          <LoadingOutlined />
                                        ) : (
                                          t("travelpage.pay")
                                        )}
                                      </Button>
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
                                        {t("travelpage.back")}
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
                                      <h2>{t("travelpage.travelinfo")}</h2>
                                    </Col>
                                    <Field
                                      title={t("travelpage.source")}
                                      field={
                                        travel?.source?.label || locationName
                                      }
                                      titleSpan={8}
                                      fieldSpan={16}
                                    />
                                    <Field
                                      title={t("travelpage.dest")}
                                      field={travel.destination.label}
                                      titleSpan={8}
                                      fieldSpan={16}
                                    />
                                    <Field
                                      title={t("travelpage.distance")}
                                      field={travel.distance}
                                    />
                                    <Field
                                      title={t("travelpage.price")}
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
                                      <h2>
                                        {user.role == "USER"
                                          ? t("travelpage.driverinfo")
                                          : t("travelpage.passinfo")}
                                      </h2>
                                    </Col>
                                    <Field
                                      title={t("profile.fullname")}
                                      field={travel.name}
                                      titleSpan={8}
                                      fieldSpan={16}
                                    />
                                    <Field
                                      title={t("profile.number")}
                                      field={travel.phone}
                                      fieldSpan={12}
                                      titleSpan={12}
                                    />
                                    {user.role == "USER" && (
                                      <Field
                                        title={t("travelpage.rate")}
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
                                    )}
                                    {user.role == "USER" && (
                                      <>
                                        <Col
                                          style={{ marginTop: "15px" }}
                                          span={24}
                                        >
                                          <h2>{t("travelpage.carinfo")}</h2>
                                        </Col>
                                        <Field
                                          title={t("travelpage.brand")}
                                          field={car?.brand}
                                        />
                                        <Field
                                          title={t("travelpage.model")}
                                          field={car?.model}
                                        />
                                        <Field
                                          title={t("travelpage.year")}
                                          field={car?.year}
                                        />
                                      </>
                                    )}
                                  </Row>
                                  <Row
                                    style={{
                                      width: "100%",
                                      paddingTop: "32px",
                                    }}
                                  >
                                    <Col span={24}>
                                      <Row gutter={[0, 10]}>
                                        {user.role == "USER" && (
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
                                              {t("travelpage.complete")}
                                            </Button>
                                          </Col>
                                        )}
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
                                            {t("homepage.cancel")}
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
                                  {user.role === "USER" ? (
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
                                  ) : (
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
                                  )}
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
                                  currencyList={currencyList}
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
        title={t("travelpage.areusure")}
        t={t}
        description={""}
        onOkModal={async () => {
          let toUserId;
          await api
            .get(`${config.urls.taxiBookingGetById}/${taxibooking.id}`)
            .then(async (response) => {
              await api.post(`${config.urls.setTaxiBookingStatus}`, {
                id: taxibooking.id,
                status: "CANCELED",
              });
              if (user.role === "USER") {
                const driver = await api.get(
                  `${config.urls.driver}/${response.data.taxiDriverId}`
                );
                toUserId = driver.data.user.id;
              } else {
                toUserId = response.data.taxiCustomerId;
              }
              socket.emit("completeTravel", {
                message: {
                  status: "canceled",
                },
                toUserId,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          setTravel(false);
          setPerson(null);
          navigate("/");
          setSource("");
          setDestination("");
          setIsPersonApproved(false);
          toast.error("Yolculuk iptal edildi!");
        }}
        isModalOpen={open}
        setIsModalOpen={setOpen}
        loading={false}
      ></AreUSureModal>
    </Row>
  );
}
