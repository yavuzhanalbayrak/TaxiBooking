import { createContext } from "react";

const GlobalContext = createContext({
  selectedKeys: {},
  setSelectedKeys: () => {},
  isPhone: {},
  setIsPhone: () => {},
  height: {},
  setHeight: () => {},
  driver: {},
  setDriver: () => {},
});

export default GlobalContext;
