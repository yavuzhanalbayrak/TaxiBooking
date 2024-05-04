import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LoadScript } from "@react-google-maps/api";
import { LoadingOutlined } from "@ant-design/icons";

const CustomLoadingElement = () => (
  <div style={{ textAlign: "center", paddingTop: "20px", height:"100vh",alignContent:"center" }}>
    <p>Harita Yükleniyor</p> <LoadingOutlined></LoadingOutlined>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_MAP_API}
      libraries={["places"]}
      loadingElement={<CustomLoadingElement />} // Set custom loading element

    >
      <App />
    </LoadScript>
  </React.StrictMode>
);
