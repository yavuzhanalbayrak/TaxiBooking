import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, Dropdown } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import location from "../images/location.png";
import destination from "../images/currentLoc.png";

export default function LocationInputs({ setSource, setDestination }) {
  const [focus, setFocus] = useState(false);

  const onSearch = () => {
    console.log("search");
  };
  const getLatAndLng = (place, type) => {
    console.log(type);
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
      <Row style={{ marginBottom: "5px" }}>
        <Col span={24}>
          <h2>Taksi</h2>
        </Col>
      </Row>
      <Row gutter={[0, 10]}>
        <Col
          span={24}
          style={{
            backgroundColor: "#00000011",
            paddingLeft: "10px",
            borderRadius: "5px",
            border: "1px solid #00000045",
            borderColor: focus === 1 ? "black" : "#00000045",
          }}
        >
          <Row align="middle">
            <Col span={2}>
              <img
                style={{ width: "15px", height: "22px" }}
                src={destination}
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
          style={{
            backgroundColor: "#00000011",
            paddingLeft: "10px",
            borderRadius: "5px",
            border: "1px solid #00000045",
            borderColor: focus === 2 ? "black" : "#00000045",
          }}
          span={24}
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
        <Col span={24}>
          <Button
            style={{ width: "100%", marginTop: "5px" }}
            onClick={() => onSearch()}
          >
            Ara
          </Button>
        </Col>
      </Row>
    </>
  );
}
