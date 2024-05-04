import { useState } from "react";
import GlobalContext from "./GlobalContext";

// eslint-disable-next-line react/prop-types
const GlobalProvider = ({ children }) => {
  const [selectedKeys, setSelectedKeyss] = useState("");

  const setSelectedKeys = async (response) => {
    setSelectedKeyss(response);
  };

  const values = {
    selectedKeys,
    setSelectedKeys,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
