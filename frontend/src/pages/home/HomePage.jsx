import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Dropdown } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Map from "../../components/map";

export default function HomePage() {
  const [startPoint, setStartPoint] = useState(null);
  const [destPoint, setDestPoint] = useState(null);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  //const {destination, setDestination, source, setSource} = useContext(GlobalContext);

  useEffect(() => {
    if(source){
      console.log("source: ",source);
    }
    if(destination){
      console.log("destination: ",destination);
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
    <Row gutter={[10,10]}>
      <Col span={24} xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
        <Row style={{ marginBottom: "5px" }}>
          <Col span={24}>
            <h2>Taksi</h2>
          </Col>
        </Row>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_MAP_API}
              selectProps={{
                placeholder: "Başlangıç adresinizi giriniz",
                destPoint,
                onChange: (place, type) => {
                  type.name = "source"
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
              apiKey={import.meta.env.VITE_MAP_API}
              selectProps={{
                placeholder: "Varış adresinizi giriniz",
                startPoint,
                onChange: (place, type)=>{
                  type.name = "source"
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
      </Col>
      <Col span={24} xs={24} sm={24} md={17} lg={17} xl={17} xxl={17}>
        <Map></Map>
      </Col>
    </Row>
  );
}
