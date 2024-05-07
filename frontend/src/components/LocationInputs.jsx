import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, Dropdown, Card } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import location from "../images/location.png";
import destinationImg from "../images/currentLoc.png";
import "../styles/global.scss";
import PrimaryButton from "../components/buttons/primaryButton";

export default function LocationInputs({
  setSource,
  setDestination,
  distance,
  startSearchForDriver,
  source,
  destination,
  isPhone,
  focus,
  setFocus,
  lat,
  lng
}) {
  const [loading, setLoading] = useState(false);

  const getLatAndLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        console.log(place.geometry.location.lat());
        if (type.name === "source") {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };

  return (
    <>
      <Row className="select-location" gutter={[0, 10]} justify="center">
        <Col span={23} className={focus === 1 ? "input focused" : "input"}>
          <Row align="middle">
            <Col span={2}>
              <img
                style={{ width: "15px", height: "22px" }}
                src={destinationImg}
                alt=""
              />
            </Col>
            <Col span={22}>
              <GooglePlacesAutocomplete
                selectProps={{
                  placeholder: "Başlangıç adresinizi giriniz",
                  onFocus: () => setFocus(1),
                  onBlur: () => setFocus(false),
                  onChange: (place, type) => {
                    type.name = "source";
                    getLatAndLng(place, type);
                  },
                  isClearable: true,
                  components: {
                    DropdownIndicator: false,
                  },
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      background: "transparent", // Set background to transparent
                      border: "none", // Remove border
                      boxShadow: "none", // Remove box shadow if any
                      width: "100%",
                      cursor: "text",
                    }),
                  },
                }}
              />{" "}
            </Col>
          </Row>
        </Col>
        <Col
          style={{ marginBottom: isPhone ? "20px" : "10px" }}
          className={focus === 2 ? "input focused" : "input"}
          span={23}
        >
          <Row align="middle">
            <Col span={2}>
              <img
                style={{ width: "15px", height: "22px" }}
                src={location}
                alt=""
              />
            </Col>
            <Col span={22}>
              <GooglePlacesAutocomplete
                selectProps={{
                  placeholder: "Varış adresinizi giriniz",
                  onFocus: () => setFocus(2),
                  onBlur: () => setFocus(false),
                  onChange: (place, type) => {
                    type.name = "destination";
                    getLatAndLng(place, type);
                  },
                  isClearable: true,
                  components: {
                    DropdownIndicator: false,
                  },
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      background: "transparent", // Set background to transparent
                      border: "none", // Remove border
                      boxShadow: "none", // Remove box shadow if any
                      width: "100%",
                      cursor: "text",
                    }),
                  },
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={23}>
          <Button
            style={{ width: "100%", marginTop: "0px",marginBottom: "35px", height: "45px", borderRadius: "25px",}}
            onClick={startSearchForDriver}
            disabled={!destination || (!source && (!lat || !lng))}
            loading={loading}
            type="primary"
          >
            Ara
          </Button>
        </Col>
      </Row>
      {/* {distance.length != [] ? (
        <Row
        className="card"
          gutter={[0, 10]}
        >
          <Col span={24}>
            {distance.length != [] ? `Mesafe: ${distance}` : null}
          </Col>
        </Row>
      ):null} */}
    </>
  );
}
