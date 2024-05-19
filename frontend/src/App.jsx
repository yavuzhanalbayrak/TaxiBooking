import React, { useState } from "react";
import "./App.css";
import GlobalProvider from "./context/GlobalProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import AuthLayout from "./Layout/AuthLayout";
import "./styles/reset.scss";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import RegisterPage from "./pages/register/RegisterPage";
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import Layout from "./Layout/Layout";
import ProfilePage from "./pages/profile/ProfilePage";
import TravelPage from "./pages/travel/TravelPage";
import io from "socket.io-client";
const socket =  io.connect(`${import.meta.env.VITE_API_PORT}`);

function App() {
  const [locationName, setLocationName] = useState(false);
  const [lat, setLat] = React.useState(false);
  const [lng, setLng] = React.useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [isPersonSearching, setIsPersonSearching] = useState(false);
  const [isPersonApproved, setIsPersonApproved] = useState(false);
  const [person, setPerson] = useState(false);
  const [display, setDisplay] = useState(false);
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [distance, setDistance] = useState("");
  const [distanceToPerson, setDistanceToPerson] = useState("");
  const [userId, setUserId] = useState(1);
  React.useEffect(() => {
    if (userId) {
      socket.emit("register", userId);

    return
    }
  }, [userId]);

  React.useEffect(() => {
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

  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <>
      <ToastContainer style={{ zIndex: 9999 }} />
      <AuthProvider store={store}>
        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AuthOutlet fallbackPath="/login" />}>
                <Route
                  path="/"
                  element={
                    <Layout link="Home">
                      <HomePage
                        setLocationName={setLocationName}
                        locationName={locationName}
                        lat={lat}
                        lng={lng}
                        setLat={setLat}
                        setLng={setLng}
                        source={source}
                        setSource={setSource}
                        destination={destination}
                        setDestination={setDestination}
                        person={person}
                        setPerson={setPerson}
                        isPersonSearching={isPersonSearching}
                        setIsPersonSearching={setIsPersonSearching}
                        setIsPersonApproved={setIsPersonApproved}
                        isPersonApproved={isPersonApproved}
                        display={display}
                        setDisplay={setDisplay}
                        isLocationClicked={isLocationClicked}
                        setIsLocationClicked={setIsLocationClicked}
                        distance={distance}
                        setDistance={setDistance}
                        distanceToPerson={distanceToPerson}
                        setDistanceToPerson={setDistanceToPerson}
                        socket={socket}
                      />
                    </Layout>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Layout link="Home">
                      <ProfilePage />
                    </Layout>
                  }
                />
                <Route
                  path="/travel"
                  element={
                    <Layout link="travel">
                      <TravelPage
                        locationName={locationName}
                        setPerson={setPerson}
                        setSource={setSource}
                        setDestination={setDestination}
                        setIsPersonApproved={setIsPersonApproved}
                      />
                    </Layout>
                  }
                />
              </Route>
              <Route
                path="/login"
                element={
                  <AuthLayout>
                    <LoginPage />
                  </AuthLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthLayout>
                    <RegisterPage />
                  </AuthLayout>
                }
              />
              <Route
                path="/forgotPassword"
                element={
                  <AuthLayout>
                    <ForgotPasswordPage />
                  </AuthLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
