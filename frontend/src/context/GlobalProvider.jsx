import { useState } from "react";
import GlobalContext from "./GlobalContext";

// eslint-disable-next-line react/prop-types
const GlobalProvider = ({ children }) => {
  const [example, setExamplee] = useState("");

  const setExample = async (response) => {
    setExamplee(response);
  };

  const values = {
    example,
    setExample,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
