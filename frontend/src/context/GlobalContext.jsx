import { createContext } from "react";

const GlobalContext = createContext({
  selectedKeys: {},
  setSelectedKeys: () => {},
});

export default GlobalContext;
