import React, { useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { setExample, example } = useContext(GlobalContext);
  useEffect(() => {
    setExample("deneme");
  }, []);


  return (
    <div>
      {example}
      
    </div>
  );
}
