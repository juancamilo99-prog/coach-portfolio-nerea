import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Farmasi } from './pages/Farmasi';
import { Contact } from './pages/Contact';


function App() {

  return (
    <Routes>
        <Route element={<Layout />}>
          {/* Definimos las rutas de nuestra web las cuales dispondremos en el navbar */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/farmasi" element={<Farmasi />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
        </Route>
    </Routes>
  )
}

export default App
