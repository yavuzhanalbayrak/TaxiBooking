import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import locationPng from "../images/location.png"

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 100px)",
};

function Map({ source, destination }) {
  const [map, setMap] = React.useState(null);
  const [center, setCenter] = useState({
    lat: 41.288,
    lng: 36.333,
  });

  useEffect(() => {
    if (source?.length != []) {
      setCenter({ lat: source.lat, lng: source.lng });
    }
  }, [source]);

  useEffect(() => {
    if (destination) {
      setCenter({ lat: destination.lat, lng: destination.lng });
    }
  }, [destination]);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    // setMap(map)
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12.6}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "7297f202550d6fee" }}
    >
      {source.length != [] ? (
        <MarkerF
        icon={{
          url:locationPng,
          scaledSize:{
            width: 30,
            height: 30,
          }
        }}
        position={{ lat: source.lat, lng: source.lng }} />
      ) : null}
    </GoogleMap>
  );
}

export default React.memo(Map);
