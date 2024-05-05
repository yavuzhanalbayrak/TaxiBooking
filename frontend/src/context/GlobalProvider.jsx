import { useState } from "react";
import GlobalContext from "./GlobalContext";

// eslint-disable-next-line react/prop-types
const GlobalProvider = ({ children }) => {
  const [selectedKeys, setSelectedKeyss] = useState("");
  const [isPhone, setIsPhonee] = useState(window.innerWidth <= 768);
  const [height, setHeightt] = useState(window.innerHeight);

  const setSelectedKeys = async (response) => {
    setSelectedKeyss(response);
  };

  const setHeight = async (response) => {
    setHeightt(response);
  };

  const setIsPhone = async (response) => {
    setIsPhonee(response);
  };

  const values = {
    selectedKeys,
    setSelectedKeys,
    isPhone,
    setIsPhone,
    height,
    setHeight,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
