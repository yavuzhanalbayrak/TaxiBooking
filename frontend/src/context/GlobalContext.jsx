import { createContext } from "react";

const GlobalContext = createContext({
  selectedKeys: {},
  setSelectedKeys: () => {},
  isPhone: {},
  setIsPhone: () => {},
});

export default GlobalContext;
