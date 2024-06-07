import React, { useEffect, useState } from "react";
import "./App.css";
import GlobalProvider from "./context/GlobalProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
import config from "./config";
import CustomLayout from "./Layout/CustomLayout";
import { useTranslation } from "react-i18next";
const socket = io.connect(`${config.env.socketUrl}`);

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
  const [userId, setUserId] = useState("");
  const [travel, setTravel] = useState("");
  const [taxiBooking, setTaxiBooking] = useState("");
  const { t } = useTranslation();

  React.useEffect(() => {
    if (userId) {
      socket.emit("register", userId);

      return;
    }
  }, [userId]);

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  React.useEffect(() => {
    socket.on("completeTravel", (message) => {
      setTravel(false);
      setPerson(null);
      setSource("");
      setDestination("");
      setIsPersonApproved(false);
      if (message.status === "success") {
        toast.success(t("alert.completeTravel"));
      } else {
        toast.error(t("alert.cancelTravel"));
      }
    });
  }, []);

  return (
    <>
      <ToastContainer style={{ zIndex: 9999 }} />
      <AuthProvider store={store}>
        <GlobalProvider>
          <BrowserRouter>
            <CustomLayout
              setTravel={setTravel}
              setDistance={setDestination}
              setSource={setSource}
              setDestination={setDestination}
              source={source}
              destination={destination}
              setTaxiBooking={setTaxiBooking}
              setIsLocationClicked={setIsLocationClicked}
              setIsPersonSearching={setIsPersonSearching}
              setPerson={setPerson}
              setIsPersonApproved={setIsPersonApproved}
              person={person}
            >
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
                          setUserId={setUserId}
                          travel={travel}
                          setTravel={setTravel}
                          taxiBooking={taxiBooking}
                          setTaxiBooking={setTaxiBooking}
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
                          socket={socket}
                          travel={travel}
                          setTravel={setTravel}
                          taxibooking={taxiBooking}
                        />
                      </Layout>
                    }
                  />
                </Route>
                <Route
                  path="/login"
                  element={
                    <AuthLayout>
                      <LoginPage setUserId={setUserId} />
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
            </CustomLayout>
          </BrowserRouter>
        </GlobalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
