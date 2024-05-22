import { Card, Col, Row, Input } from "antd";
import React from "react";
import PhoneInput from "react-phone-input-2";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useJsApiLoader } from "@react-google-maps/api";
import "react-phone-input-2/lib/style.css";
import "../travel/travelStyle.scss";
import config from "../../config";

export default function Field(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: config.env.mapApi,
    libraries: ["places"],
  });

  return (
    <Col span={24} style={{ margin: "5px 0px" }}>
      <Card>
        <Row>
          <Col className="title" span={props.titleSpan || 12}>
            {props.title}
          </Col>
          <Col
            className="field"
            span={props.fieldSpan || 12}
            style={{
              color:
                props.type === "success"
                  ? "#00bb00"
                  : props.type == "danger"
                  ? "#da0000"
                  : undefined,
            }}
          >
            {props.edit ? (
              props.value == "phone" ? (
                <PhoneInput
                  style={{ textAlign: "start" }}
                  country={"tr"}
                  value={props.fieldValue?.[props.value]}
                  onChange={(value) =>
                    props.onFieldChange((prevstate) => ({
                      ...prevstate,
                      phone: value,
                    }))
                  }
                  inputStyle={{ width: "100%" }}
                />
              ) : props.value == "address" ? (
                <div style={{ textAlign: "start", color: "black" }}>
                  {isLoaded && (
                    <GooglePlacesAutocomplete
                      selectProps={{
                        placeholder: props.field,
                        onChange: (place, type) => {
                          const placeId = place.value.place_id;
                          const service =
                            new window.google.maps.places.PlacesService(
                              document.createElement("div")
                            );
                          service.getDetails({ placeId }, (place, status) => {
                            if (
                              status === "OK" &&
                              place.geometry &&
                              place.geometry.location
                            ) {
                              props.onFieldChange((prevstate) => ({
                                ...prevstate,
                                address: {
                                  label: place.formatted_address,
                                  lat: place.geometry.location.lat(),
                                  lng: place.geometry.location.lng(),
                                },
                              }));
                            }
                          });
                        },
                        components: {
                          DropdownIndicator: false,
                        },
                        styles: {
                          control: (provided) => ({
                            ...provided,
                            width: "100%",
                            cursor: "text",
                          }),
                        },
                      }}
                    />
                  )}
                </div>
              ) : (
                <Input
                  value={props.fieldValue?.[props.value]}
                  placeholder={props.placeholder}
                  onChange={(e) =>
                    props.onFieldChange((prevstate) => ({
                      ...prevstate,
                      [props.value]: e.target.value,
                    }))
                  }
                />
              )
            ) : typeof props.field === "function" ? (
              props.field()
            ) : (
              props.field
            )}
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
