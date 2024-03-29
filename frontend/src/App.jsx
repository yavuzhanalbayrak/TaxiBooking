import {} from "react";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import GlobalProvider from "./context/GlobalProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import AuthLayout from "./Layout/AuthLayout";
import "./styles/reset.scss";

function App() {
  return (
    <>
      <ToastContainer style={{ zIndex: 9999 }} />
      <AuthProvider>
        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={
                  <AuthLayout>
                    <LoginPage />
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
