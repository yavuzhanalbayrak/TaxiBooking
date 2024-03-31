import React, { useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export default function HomePage() {
  const { setExample, example } = useContext(GlobalContext);
  useEffect(() => {
    setExample("deneme");
  }, []);

  const signOut = useSignOut();

  return (
    <div>
      {example}
      <Link
          to="/login"
          style={{ textDecoration: "none" }}
          onClick={() => signOut()}
          color="inherit"
        >
          Çıkış Yap
        </Link>
    </div>
  );
}
