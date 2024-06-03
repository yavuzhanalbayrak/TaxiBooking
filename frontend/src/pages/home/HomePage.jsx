import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Modal, Button, ConfigProvider, message } from "antd";
import Map from "../../components/map/Map";
import LocationInputs from "../../components/LocationInputs";
import LoadingModal from "../../components/loadingModal/LoadingModal";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  LoadingOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import GlobalContext from "../../context/GlobalContext";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import config from "../../config";
import api from "../../utils/api";

export default function HomePage({
  setLocationName,
  lat,
  lng,
  setLat,
  setLng,
  source,
  setSource,
  destination,
  setDestination,
  isPersonApproved,
  setIsPersonApproved,
  isPersonSearching,
  setIsPersonSearching,
  person,
  setPerson,
  display,
  setDisplay,
  isLocationClicked,
  setIsLocationClicked,
  distance,
  setDistance,
  distanceToPerson,
  setDistanceToPerson,
  socket,
  setUserId,
  locationName,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedKeys, isPhone, height, setTravel, travel } =
    useContext(GlobalContext);
  const [focus, setFocus] = useState(false);
  const [totalDistance, setTotalDistance] = useState(false);
  const [mes, setMes] = useState(false);
  const user = useAuthUser();
  const { t } = useTranslation();
  const [distanceNumber, unit] = distance.split(" ");
  const [distanceToPersonNumber] = distanceToPerson.split(" ");

  // toUserId idsine sahip cliente mesaj atar.
  React.useEffect(() => {
    //socket.emit("privateMessage", { message: "özel333", toUserId: 2 });
    if (user.role == "DRIVER") {
      socket.on("privateMessage", (message) => {
      console.log("MESS", message);
        setMes(message);
      });
    }
  }, []);

  useEffect(() => {
    if (!person && mes) {
      setPerson({
        lat: mes.taxiBooking.route[1].latitude,
        lng: mes.taxiBooking.route[1].longitude,
        label: mes.taxiBooking.route[1].address,
        destination: {
          lat: mes.taxiBooking.route[0].latitude,
          lng: mes.taxiBooking.route[0].longitude,
          label: mes.taxiBooking.route[0].address,
        },
        user: mes.user,
      });
      setTaxiBooking(mes.taxiBooking);
      setIsLocationClicked(true);
      setIsPersonSearching(false);
    }
  }, [mes]);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    setTotalDistance(
      parseFloat(distanceNumber) + parseFloat(distanceToPersonNumber)
    );
  }, [distanceNumber, distanceToPersonNumber]);

  // useEffect(() => {
  //   let timeoutId;
  //   if (isPersonSearching) {
  //     timeoutId = setTimeout(() => {
  //       setPerson({
  //         lat: 40 + 0.7,
  //         lng: 30 + 0.1,
  //         destination: {
  //           lat: 40 + 0.7,
  //           lng: 30,
  //           label: "Sakarya",
  //         },
  //       });
  //       setIsLocationClicked(true);
  //       setIsPersonSearching(false);
  //     }, 2000);
  //   }

  //   // Cleanup function to clear the timeout if isPersonSearching changes
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [isPersonSearching]);

  useEffect(() => {
    setSelectedKeys(["1"]);
  }, []);

  useEffect(() => {
    if (!isLocationClicked) {
      setTimeout(() => {
        setDisplay(true);
      }, 400);
    } else {
      setDisplay(false);
    }
  }, [isLocationClicked]);

  const [taxiBooking, setTaxiBooking] = useState("");

  const startSearchForDriver = () => {
    if (destination && (source || (lat && lng))) {
      setIsModalOpen(true);

      api
        .post(config.urls.taxiBooking, {
          fromLocation: {
            address: source.label || locationName,
            latitude: source.lat || lat,
            longitude: source.lng || lng,
          },
          toLocation: {
            address: destination.label,
            latitude: destination.lat,
            longitude: destination.lng,
          },
          totalDistanceMeters: 0,
          city: "sakarya",
          customerId: user.id,
          vehicleType: "string",
        })
        .then((taxiBooking) => {
          console.log(taxiBooking);
          setTaxiBooking(taxiBooking.data);
        });
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: config.env.mapApi,
    libraries: ["places"],
  });

  const handleSearchPerson = async () => {
    const driver = await api.get(
      `${config.urls.changeDriverStatus}/${user.id}`
    );
    const driverId = driver.data.id;
    await api.post(`${config.urls.setDriverAvailable}`, {
      driverId,
      location: {
        address: "sakarya",
        latitude: lat,
        longitude: lng,
      },
    });
  };

  const handleCancelSearchPerson = async () => {
    const driver = await api.get(
      `${config.urls.changeDriverStatus}/${user.id}`
    );
    const driverId = driver.data.id;

    await api.post(`${config.urls.setDriverUnAvailable}/${driverId}`);
  };

  return (
    <>
      {/* {mes} */}
      {isLoaded ? (
        <div>
          {isPhone ? (
            //Phone

            <Row gutter={[10, 10]}>
              <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={17}>
                <div className="map">
                  <Card bordered={false} style={{ borderRadius: "0px" }}>
                    <div style={{ position: "relative" }}>
                      <Map
                        source={source}
                        destination={destination}
                        setDistance={setDistance}
                        distance={distance}
                        setDistanceToPerson={setDistanceToPerson}
                        distanceToPerson={distanceToPerson}
                        isPhone={true}
                        lat={lat}
                        lng={lng}
                        setLat={setLat}
                        setLng={setLng}
                        setDestination={setDestination}
                        setSource={setSource}
                        setLocationName={setLocationName}
                        person={person}
                      ></Map>
                    </div>
                    {user.role == "USER" ? (
                      <div className={"location-inputs-phone"}>
                        <Card
                          style={{
                            boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.2)",
                            transform:
                              isLocationClicked && !travel
                                ? `translateY(-217px)`
                                : ``,
                            transition: "transform 0.3s ease-in-out",
                            transformOrigin: "top",
                            top: `${height - 134}px`,
                            border: "none",
                            backgroundColor: "#efefff",
                            position: "absolute",
                            width: "100%",
                          }}
                          className={"location-inputs-card-phone "}
                          title={
                            <div
                              onClick={() => {
                                if (!travel)
                                  setIsLocationClicked(
                                    (Prevstate) => !Prevstate
                                  );
                              }}
                              style={{
                                backgroundColor: "#00305f",
                                color: "#efefff",
                              }}
                            >
                              {travel
                                ? `${t("homepage.haveagjourney")}, ${
                                    user.name
                                  }!`
                                : t("homepage.select")}
                              {!travel && (
                                <span style={{ marginLeft: "5px" }}>
                                  {isLocationClicked ? (
                                    <DownCircleOutlined />
                                  ) : (
                                    <UpCircleOutlined />
                                  )}{" "}
                                </span>
                              )}
                            </div>
                          }
                        >
                          <div className="ant-card">
                            <div
                              style={{
                                paddingTop: "10px",
                                maxHeight: "217px",
                                overflowY: focus ? "auto" : "hidden",
                              }}
                              className={
                                display
                                  ? "ant-card-body clicked"
                                  : "ant-card-body"
                              }
                            >
                              <div style={{ height: focus ? "400px" : "auto" }}>
                                <LocationInputs
                                  setSource={setSource}
                                  setDestination={setDestination}
                                  destination={destination}
                                  source={source}
                                  distance={distance}
                                  startSearchForDriver={startSearchForDriver}
                                  isPhone={true}
                                  focus={focus}
                                  setFocus={setFocus}
                                  lat={lat}
                                  lng={lng}
                                  t={t}
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <div className={"location-inputs-phone"}>
                        <Card
                          style={{
                            boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.2)",
                            transform:
                              person && !isPersonApproved
                                ? `translateY(-159px)`
                                : ``,
                            transition: "transform 0.3s ease-in-out",
                            transformOrigin: "top",
                            top: `${height - 134}px`,
                            border: "none",
                            backgroundColor: "#efefff",
                            position: "absolute",
                            width: "100%",
                          }}
                          className={"location-inputs-card-phone "}
                          title={
                            <div
                              style={{
                                backgroundColor: "#00305f",
                                color: "#efefff",
                              }}
                            >
                              {person ? (
                                isPersonApproved ? (
                                  t("homepage.haveagjourney") + "!"
                                ) : (
                                  t("homepage.passengerfound")
                                )
                              ) : !isPersonSearching ? (
                                <Button
                                  onClick={() => {
                                    setIsPersonSearching(true);
                                    handleSearchPerson();
                                  }}
                                  type="primary"
                                  size="large"
                                  style={{
                                    width: "40%",
                                    borderRadius: "25px",
                                    minWidth: "170px",
                                  }}
                                >
                                  {t("homepage.search")}
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    setIsPersonSearching(false);
                                    setPerson("");
                                    setMes("");
                                    handleCancelSearchPerson("");
                                  }}
                                  danger
                                  type="primary"
                                  size="large"
                                  style={{
                                    width: "40%",
                                    borderRadius: "25px",
                                    minWidth: "170px",
                                  }}
                                >
                                  {" "}
                                  <LoadingOutlined></LoadingOutlined>{" "}
                                  {t("homepage.cancel")}
                                </Button>
                              )}
                            </div>
                          }
                        >
                          <div
                            className={
                              display
                                ? "ant-card-body clicked"
                                : "ant-card-body"
                            }
                            style={{ padding: "24px", color: "#000000" }}
                          >
                            <Row>
                              <Col span={24}>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "16px",
                                  }}
                                >
                                  <strong>{t("homepage.distance")}:</strong>{" "}
                                  <span style={{ color: "#f17624" }}>
                                    {totalDistance?.toFixed(1) + " " + unit}
                                  </span>
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "16px",
                                  }}
                                >
                                  <strong>{t("homepage.price")}:</strong>{" "}
                                  <span style={{ color: "#f17624" }}>
                                    210 TL
                                  </span>
                                </p>
                              </Col>
                            </Row>
                            <Row style={{ marginTop: "20px" }} gutter={[10, 5]}>
                              <Col span={12}>
                                <Button
                                  type="primary"
                                  style={{
                                    width: "100%",
                                    borderRadius: "25px",
                                  }}
                                  size="large"
                                  onClick={() => {
                                    setIsPersonApproved(true);
                                    setTravel({
                                      name: person.user.name,
                                      email: person.user.email,
                                      phone: person.user.phone,
                                      car: {
                                        brand: "Honda",
                                        model: "pcx",
                                        year: "2021",
                                      },
                                      rating: 3,
                                      destination,
                                      distance: `${totalDistance} km` || distance,
                                      source,
                                      price:
                                        parseInt(distance.match(/\d+/)[0]) * 10,
                                      currency: "TRY",
                                    });

                                    socket.emit("privateMessage", { message: {
                                      name: user.name,
                                      email: user.email,
                                      phone: user.phone,
                                      taxiBooking,
                                      distance,
                                      car: {
                                        brand: "Honda",
                                        model: "pcx",
                                        year: "2021",
                                      },
                                      rating: 3,
                                    }, toUserId: person.user.id });
                                  }}
                                >
                                  {t("homepage.approve")}
                                </Button>
                              </Col>
                              <Col span={12}>
                                <Button
                                  danger
                                  type="primary"
                                  style={{
                                    width: "100%",
                                    borderRadius: "25px",
                                  }}
                                  size="large"
                                  onClick={() => {
                                    setPerson("");
                                    setDestination("");
                                    setSource("");
                                    setIsPersonSearching(true);
                                    setIsLocationClicked(false);
                                    setIsLocationClicked(false);
                                  }}
                                >
                                  {t("homepage.reject")}
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      </div>
                    )}
                  </Card>
                </div>
              </Col>
            </Row>
          ) : (
            <Row gutter={[10, 10]}>
              <Col span={24} xs={24} sm={24} md={10} lg={10} xl={8} xxl={7}>
                <Col>
                  {user.role == "USER" ? (
                    <Card title="Varış Noktası Seçiniz">
                      <LocationInputs
                        setSource={setSource}
                        setDestination={setDestination}
                        destination={destination}
                        source={source}
                        distance={distance}
                        setDistanceToPerson={setDistanceToPerson}
                        distanceToPerson={distanceToPerson}
                        startSearchForDriver={startSearchForDriver}
                        isPhone={false}
                        focus={focus}
                        setFocus={setFocus}
                        lat={lat}
                        lng={lng}
                        t={t}
                      ></LocationInputs>
                    </Card>
                  ) : (
                    <Card
                      bodyStyle={{
                        padding: "0px",
                      }}
                      style={{
                        boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.2)",
                        border: "none",
                        backgroundColor: "#efefff",
                      }}
                      className={"location-inputs-card-phone "}
                      title={
                        <div
                          style={{
                            backgroundColor: "#00305f",
                            color: "#efefff",
                          }}
                        >
                          {person ? (
                            isPersonApproved ? (
                              t("homepage.haveagjourney") + "!"
                            ) : (
                              t("homepage.passengerfound")
                            )
                          ) : !isPersonSearching ? (
                            <Button
                              onClick={() => {
                                setIsPersonSearching(true);
                                handleSearchPerson();
                              }}
                              type="primary"
                              size="large"
                              style={{ width: "40%", borderRadius: "25px" }}
                            >
                              {t("homepage.search")}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                setIsPersonSearching(false);
                                handleCancelSearchPerson();
                              }}
                              danger
                              type="primary"
                              size="large"
                              style={{ width: "40%", borderRadius: "25px" }}
                            >
                              {" "}
                              <LoadingOutlined></LoadingOutlined>{" "}
                              {t("homepage.cancel")}
                            </Button>
                          )}
                        </div>
                      }
                    >
                      <div
                        className="ant-card-body"
                        style={{
                          padding: "24px",
                          color: "#000000",
                          display: !(person && !isPersonApproved) && "none",
                        }}
                      >
                        <Row>
                          <Col span={24}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "16px",
                              }}
                            >
                              <strong>{t("homepage.distance")}:</strong>{" "}
                              <span style={{ color: "#f17624" }}>15 KM</span>
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "16px",
                              }}
                            >
                              <strong>{t("homepage.price")}:</strong>{" "}
                              <span style={{ color: "#f17624" }}>210 TL</span>
                            </p>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "20px" }} gutter={[0, 5]}>
                          <Col span={24}>
                            <Button
                              type="primary"
                              style={{
                                width: "100%",
                                borderRadius: "25px",
                              }}
                              onClick={() => {
                                setIsPersonApproved(true);
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
                                  price:
                                    parseInt(distance.match(/\d+/)[0]) * 10,
                                  currency: "TRY",
                                });
                              }}
                            >
                              {t("homepage.approve")}
                            </Button>
                          </Col>
                          <Col span={24}>
                            <Button
                              danger
                              type="primary"
                              style={{
                                width: "100%",
                                borderRadius: "25px",
                              }}
                              onClick={() => {
                                setPerson("");
                                setDestination("");
                                setSource("");
                                setIsPersonSearching(true);
                                setIsLocationClicked(false);
                                setIsLocationClicked(false);
                              }}
                            >
                              {t("homepage.reject")}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  )}
                </Col>
              </Col>
              <Col span={24} xs={24} sm={24} md={14} lg={14} xl={16} xxl={17}>
                <div className="map">
                  <Card title={t("layout.map")} bordered={false}>
                    <Map
                      source={source}
                      destination={destination}
                      setDistance={setDistance}
                      distance={distance}
                      setDistanceToPerson={setDistanceToPerson}
                      distanceToPerson={distanceToPerson}
                      isPhone={false}
                      lat={lat}
                      lng={lng}
                      setLat={setLat}
                      setLng={setLng}
                      setDestination={setDestination}
                      setSource={setSource}
                      setLocationName={setLocationName}
                      person={person}
                    ></Map>
                  </Card>
                </div>
              </Col>
            </Row>
          )}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            height: `${height - 100}px`,
            alignContent: "center",
          }}
        >
          <p>{t("homepage.maploading")}</p> <LoadingOutlined></LoadingOutlined>
        </div>
      )}

      <LoadingModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        destination={destination}
        distance={distance}
        source={source}
        t={t}
        taxiBooking={taxiBooking}
        socket={socket}
        user={user}
      ></LoadingModal>
    </>
  );
}
