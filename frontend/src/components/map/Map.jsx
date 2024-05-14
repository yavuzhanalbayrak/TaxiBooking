import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  OverlayView,
  DirectionsRenderer,
  DistanceMatrixService,
} from "@react-google-maps/api";
import currentLocation from "../../images/currentLoc.png";
import location from "../../images/location.png";
import blueCircle from "../../images/blue-circle.png";
import GlobalContext from "../../context/GlobalContext";

function Map({
  source,
  destination,
  setDistance,
  distance,
  isPhone,
  lat,
  lng,
  setDestination,
}) {
  const [map, setMap] = React.useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [distanceMatrix, setDistanceMatrix] = useState([]);
  const { height } = React.useContext(GlobalContext);

  const containerStyle = {
    width: "100%",
    height: isPhone ? `calc(${height}px - 80px)` : `calc(${height}px - 160px)`,
  };

  const [center, setCenter] = useState({
    lat: lat || 41.288,
    lng: lng || 36.333,
  });

  // Function to fetch location information
  const getLocationInfo = (lat, lng) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const locationName = results[0].formatted_address;

          setDestination({ lat, lng, label: locationName });

        } else {
          console.log("No results found");
        }
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });

    console.log("Clicked location coordinates:", lat, lng);
  };

  const handleMapClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    // Call a function to handle getting location information
    getLocationInfo(clickedLat, clickedLng);
  };

  useEffect(() => {
    if (lat && lng && source?.length == []) setCenter({ lat, lng });
  }, [lat, lng]);

  useEffect(() => {
    if (source?.length != []) {
      setCenter({ lat: source.lat, lng: source.lng });
    }

    if (destination?.length != []) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination?.length != []) {
      setCenter({ lat: destination.lat, lng: destination.lng });
    }

    if (destination?.length != []) {
      directionRoute();
    }
    else{
      setDirectionRoutePoints([]);
    }
  }, [destination]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: {
          lat: source.lat || lat,
          lng: source.lng || lng,
        },
        destination: {
          lat: destination.lat || lat,
          lng: destination.lng || lng,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result) => {
        console.log("RES: ", result.status);

        if (result.status === "OK") {
          console.log("RES: ", result);
          setDirectionRoutePoints(result);
          calculateDistanceMatrix();
        } else {
          console.log("Error");
        }
      }
    );
  };

  const calculateDistanceMatrix = () => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(source.lat || lat, source.lng || lng)],
        destinations: [
          new google.maps.LatLng(destination.lat, destination.lng),
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          setDistanceMatrix(response);
        } else {
          console.error("Error calculating distance matrix:", status);
        }
      }
    );
  };

  useEffect(() => {
    if (distanceMatrix.length != [])
      setDistance(distanceMatrix.rows[0].elements[0].distance.text);
  }, [distanceMatrix]);

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
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12.6}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick} // Add onClick event handler to the GoogleMap component
        options={{
          mapId: "7297f202550d6fee",
          fullscreenControl: false,
          zoomControl: false,
          gestureHandling: "greedy", // Allow the map to respond to all gestures
          draggableCursor: "grab", // Set the cursor to grab to indicate the map is draggable
          streetViewControl: false, // Disable the default street view control
        }}
      >
        <MarkerF
          icon={{
            url: blueCircle,
            scaledSize: {
              width: 15,
              height: 15,
            },
          }}
          position={{ lat, lng }}
        ></MarkerF>

        {source.length != [] ? (
          <MarkerF
            icon={{
              url: currentLocation,
              scaledSize: {
                width: 20,
                height: 29,
              },
            }}
            position={{ lat: source.lat, lng: source.lng }}
          >
            <OverlayView
              position={{ lat: source.lat, lng: source.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFFd5",
                  width: "80px",
                  fontSize: "15px",
                  textAlign: "center",
                  color: "black",
                  borderRadius: "10px",
                  boxShadow: "1.5px 1.5px 5px 0px",
                }}
              >
                <p> {source.label} </p>
              </div>
            </OverlayView>
          </MarkerF>
        ) : null}

        {destination.length != [] ? (
          <MarkerF
            icon={{
              url: location,
              scaledSize: {
                width: 20,
                height: 29,
              },
            }}
            position={{ lat: destination.lat, lng: destination.lng }}
          >
            <OverlayView
              position={{ lat: destination.lat, lng: destination.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFFd5",
                  width: "80px",
                  fontSize: "15px",
                  textAlign: "center",
                  color: "black",
                  borderRadius: "10px",
                  boxShadow: "1.5px 1.5px 5px 0px",
                }}
              >
                <p>
                  {`${destination.label}`}
                  <br />
                  {`( ${distance} )`}
                </p>{" "}
              </div>
            </OverlayView>
          </MarkerF>
        ) : null}

        {destination.length != [] &&
          <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: "blue",
              strokeOpacity: 0.8,
              strokeWeight: 5,
            },
            suppressMarkers: true,
          }}
        ></DirectionsRenderer>}
      </GoogleMap>
    </div>
  );
}

export default React.memo(Map);
