import {} from "react";
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
function App() {
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
                <Route path="/" element={<HomePage />} />
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
                    <RegisterPage />
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
