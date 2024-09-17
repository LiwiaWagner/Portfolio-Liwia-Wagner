import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './UI/header/Header.jsx'
import Navbar from './UI/navbar/Navbar.jsx'
import Home from './pages/home/Home.jsx'
import Portfolio from './pages/portfolio/Portfolio.jsx'
import About from './pages/about/About.jsx'
import Resume from './pages/resume/Resume.jsx'
import Footer from './UI/footer/Footer.jsx'

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App