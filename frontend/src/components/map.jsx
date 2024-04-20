import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 100px)",
};

const center = {
  lat: 41.288,
  lng: 36.333,
};

function Map() {
  const [map, setMap] = React.useState(null);

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
      <></>
    </GoogleMap>
  );
}

export default React.memo(Map);
