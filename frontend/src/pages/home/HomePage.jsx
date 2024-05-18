import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Modal, Button } from "antd";
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
}) {
  const [distance, setDistance] = useState("");
  const [distanceToPerson, setDistanceToPerson] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedKeys, isPhone, height, setTravel, travel } =
    useContext(GlobalContext);
  const [focus, setFocus] = useState(false);
  const user = useAuthUser();

  useEffect(() => {
    let timeoutId;
    if (isPersonSearching) {
      timeoutId = setTimeout(() => {
        setPerson({
          lat: 40 + 0.7,
          lng: 30 + 0.1,
          destination: {
            lat: 40 + 0.7,
            lng: 30,
            label: "Sakarya",
          },
        });
        setIsLocationClicked(true);
        setIsPersonSearching(false);
      }, 2000);
    }

    // Cleanup function to clear the timeout if isPersonSearching changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPersonSearching]);

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

  const startSearchForDriver = () => {
    if (destination && (source || (lat && lng))) {
      setIsModalOpen(true);
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAP_API,
    libraries: ["places"],
  });

  return (
    <>
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
                    {user.role == "user" ? (
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
                                backgroundColor: "#00007f",
                                color: "#efefff",
                              }}
                            >
                              {travel
                                ? `İyi yolculuklar, ${user.name}`
                                : "Varış Noktası Seçiniz"}
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
                                ? `translateY(-185px)`
                                : ``,
                            transition: "transform 0.3s ease-in-out",
                            transformOrigin: "top",
                            top: `${height - 134}px`,
                            border: "none",
                            backgroundColor: "#efefff",
                          }}
                          className={"location-inputs-card-phone "}
                          title={
                            <div
                              style={{
                                backgroundColor: "#00007f",
                                color: "#efefff",
                              }}
                            >
                              {person ? (
                                isPersonApproved ? (
                                  "İyi Yolculuklar!"
                                ) : (
                                  "Yolcu Bulundu!"
                                )
                              ) : !isPersonSearching ? (
                                <Button
                                  onClick={() => {
                                    setIsPersonSearching(true);
                                  }}
                                  type="primary"
                                  size="large"
                                  style={{ width: "40%", borderRadius: "25px" }}
                                >
                                  Yolcu Ara
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    setIsPersonSearching(false);
                                  }}
                                  danger
                                  type="primary"
                                  size="large"
                                  style={{ width: "40%", borderRadius: "25px" }}
                                >
                                  {" "}
                                  <LoadingOutlined></LoadingOutlined> İptal et
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
                                  <strong>Toplam Mesafe:</strong>{" "}
                                  <span style={{ color: "#f17624" }}>
                                    15 KM
                                  </span>
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "16px",
                                  }}
                                >
                                  <strong>Ücret:</strong>{" "}
                                  <span style={{ color: "#f17624" }}>
                                    210 TL
                                  </span>
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
                                  Kabul et
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
                                  Reddet
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
                  {user.role == "user" ? (
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
                      ></LocationInputs>
                    </Card>
                  ) : (
                    <Card
                      style={{
                        boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.2)",
                        border: "none",
                        backgroundColor: "#efefff",
                      }}
                      className={"location-inputs-card-phone "}
                      title={
                        <div
                          style={{
                            backgroundColor: "#00007f",
                            color: "#efefff",
                          }}
                        >
                          {person ? (
                            isPersonApproved ? (
                              "İyi Yolculuklar!"
                            ) : (
                              "Yolcu Bulundu!"
                            )
                          ) : !isPersonSearching ? (
                            <Button
                              onClick={() => {
                                setIsPersonSearching(true);
                              }}
                              type="primary"
                              size="large"
                              style={{ width: "40%", borderRadius: "25px" }}
                            >
                              Yolcu Ara
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                setIsPersonSearching(false);
                              }}
                              danger
                              type="primary"
                              size="large"
                              style={{ width: "40%", borderRadius: "25px" }}
                            >
                              {" "}
                              <LoadingOutlined></LoadingOutlined> İptal et
                            </Button>
                          )}
                        </div>
                      }
                    >
                      <div
                        className={
                          display ? "ant-card-body clicked" : "ant-card-body"
                        }
                        style={{
                          padding: "24px",
                          color: "#000000",
                          display: (display || isPersonApproved) && "none",
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
                              <strong>Toplam Mesafe:</strong>{" "}
                              <span style={{ color: "#f17624" }}>15 KM</span>
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "16px",
                              }}
                            >
                              <strong>Ücret:</strong>{" "}
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
                              Kabul et
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
                              Reddet
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
                  <Card title="Harita" bordered={false}>
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
          <p>Harita Yükleniyor</p> <LoadingOutlined></LoadingOutlined>
        </div>
      )}

      <LoadingModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        destination={destination}
        distance={distance}
        source={source}
      ></LoadingModal>
    </>
  );
}
