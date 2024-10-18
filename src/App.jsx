import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./UI/navbar/Navbar.jsx";
import Footer from "./UI/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import { ProjectNetworkEdge } from "./pages/project_network_edge/ProjectNetworkEdge.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project-network-edge" element={<ProjectNetworkEdge />} />
        {/* <Route path="/project-cyclistic" element={<ProjectCyclistic />} />
        <Route path="/project-network-edge" element={<ProjectNetworkEdge />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
