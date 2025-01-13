import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./UI/navbar/Navbar.jsx";
import Footer from "./UI/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import { ProjectNetworkEdge } from "./pages/project_network_edge/ProjectNetworkEdge.jsx";
import { ProjectSustainableTravel } from "./pages/project_sustainable_travel/ProjectSustainableTravel.jsx";
import { ProjectIris } from "./pages/project_iris/ProjectIris.jsx";
import { ProjectCyclistic } from "./pages/project_cyclistic/ProjectCyclistic.jsx";

const ScrollToTopRouter = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTopRouter />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project-network-edge" element={<ProjectNetworkEdge />} />
        <Route
          path="/project-sustainable-business-travel"
          element={<ProjectSustainableTravel />}
        />
        <Route path="/project-iris-species" element={<ProjectIris />} />
        <Route
          path="/capstone-project-google-bi-certification"
          element={<ProjectCyclistic />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
