import { createContext } from "react";

const GlobalContext = createContext({
  selectedKeys: {},
  setSelectedKeys: () => {},
  isPhone: {},
  setIsPhone: () => {},
  height: {},
  setHeight: () => {},
  travel: {},
  setTravel: () => {},
});

export default GlobalContext;
