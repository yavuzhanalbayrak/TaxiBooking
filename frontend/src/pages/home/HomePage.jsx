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

export default function HomePage({setLocationName}) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [display, setDisplay] = useState(false);
  const { setSelectedKeys, isPhone, height } = useContext(GlobalContext);
  const [focus, setFocus] = useState(false);
  const [lat, setLat] = React.useState(false);
  const [lng, setLng] = React.useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          getLocationName(position.coords.latitude, position.coords.longitude);

        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );

    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getLocationName = (lat, lng) => {
    const geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const locationName = results[0].formatted_address;
          setLocationName(locationName);
  
        } else {
          console.log("No results found");
        }
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });
  };

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
                        isPhone={true}
                        lat={lat}
                        lng={lng}
                        setDestination={setDestination}
                      ></Map>
                    </div>
                    <div className={"location-inputs-phone"}>
                      <Card
                        style={{
                          boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.2)",
                          transform: isLocationClicked
                            ? `translateY(-217px)`
                            : ``,
                          transition: "transform 0.3s ease-in-out",
                          transformOrigin: "top",
                          top: `${height - 137}px`,
                        }}
                        className={"location-inputs-card-phone "}
                        title={
                          <div
                            onClick={() =>
                              setIsLocationClicked((Prevstate) => !Prevstate)
                            }
                          >
                            Varış Noktası Seçiniz{" "}
                            <span style={{ marginLeft: "5px" }}>
                              {isLocationClicked ? (
                                <DownCircleOutlined />
                              ) : (
                                <UpCircleOutlined />
                              )}{" "}
                            </span>
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
                  </Card>
                </div>
              </Col>
            </Row>
          ) : (
            <Row gutter={[10, 10]}>
              <Col span={24} xs={24} sm={24} md={10} lg={10} xl={8} xxl={7}>
                <Col>
                  <Card title="Varış Noktası Seçiniz">
                    <LocationInputs
                      setSource={setSource}
                      setDestination={setDestination}
                      destination={destination}
                      source={source}
                      distance={distance}
                      startSearchForDriver={startSearchForDriver}
                      isPhone={false}
                      focus={focus}
                      setFocus={setFocus}
                      lat={lat}
                      lng={lng}
                    ></LocationInputs>
                  </Card>
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
                      isPhone={false}
                      lat={lat}
                      lng={lng}
                      setDestination={setDestination}
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
            height: `${height-100}px`,
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
