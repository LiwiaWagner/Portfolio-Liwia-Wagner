import React, { useEffect } from "react";
import "./home.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document
        .querySelector(location.hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <>
      <div id="view" style={{ marginTop: 1000 }}>
        VIEW
      </div>
    </>
  );
};

export default Home;
