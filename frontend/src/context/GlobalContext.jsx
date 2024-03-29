import { createContext } from "react";

const GlobalContext = createContext({
  example: {},
  setExample: () => {},
});

export default GlobalContext;
