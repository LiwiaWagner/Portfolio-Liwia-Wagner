import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './UI/navbar/Navbar.jsx'
import Footer from './UI/footer/Footer.jsx'
import Home from './pages/home/Home.jsx'
import About from './pages/about/About.jsx'

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