import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, Button, Dropdown } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function LocationInputs() {
  const [startPoint, setStartPoint] = useState(null);
  const [destPoint, setDestPoint] = useState(null);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    if (source) {
      console.log("source: ", source);
    }
    if (destination) {
      console.log("destination: ", destination);
    }
  }, [source, destination]);

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
        <Col span={24}>
          <GooglePlacesAutocomplete
            selectProps={{
              placeholder: "Başlangıç adresinizi giriniz",
              destPoint,
              onChange: (place, type) => {
                type.name = "source";
                setDestPoint();
                getLatAndLng(place, type);
              },
              isClearable: true,
              components: {
                DropdownIndicator: false,
              },
              styles: {
                control: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
              },
            }}
          />{" "}
        </Col>
        <Col span={24}>
          <GooglePlacesAutocomplete
            selectProps={{
              placeholder: "Varış adresinizi giriniz",
              startPoint,
              onChange: (place, type) => {
                type.name = "source";
                setDestPoint();
                getLatAndLng(place, type);
              },
              isClearable: true,
              components: {
                DropdownIndicator: false,
              },
              styles: {
                control: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
              },
            }}
          />{" "}
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
