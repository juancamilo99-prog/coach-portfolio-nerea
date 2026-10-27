import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Farmasi } from './pages/Farmasi';
import { Contact } from './pages/Contact';
import { TermsOfService } from './pages/terms/TermsOfService';
import { PrivacyPolicy } from './pages/terms/PrivacyPolicy';
import { NewsletterStatus } from './components/NewsletterStatus';


function App() {

  return (
    <>
    <NewsletterStatus />
      <Routes>
        <Route element={<Layout />}>
          {/* Definimos las rutas de nuestra web las cuales dispondremos en el navbar */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/farmasi" element={<Farmasi />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/terms" element={<TermsOfService />}></Route>
            <Route path="/privacy" element={<PrivacyPolicy />}></Route>
        </Route>
    </Routes>
    </>
  )
}

export default App
