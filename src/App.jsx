import AppProvider from "./context/context"
import Aos from "aos"
import 'aos/dist/aos.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Locatarios from "./pages/Locatarios"
import { useEffect } from "react";
import Casa from "./pages/Casa";


function App() {
  useEffect(()=>{Aos.init({duration: 300})},[])
  
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path="/locatarios" element={<Locatarios/>}/>
          <Route path="/casa/:id" element={<Casa/>}/>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
