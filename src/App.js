import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Redirect from './pages/Redirect'
import HomePage from './pages/HomePage'
import Command from './pages_provider/Command'
import Requetes from './pages/Requetes'
import SignParticular from './pages/SignParticular'
import Dashboard from './pages_provider/Dashboard'
import RegisterP from './pages_provider/RegisterP'
import Compte from './pages_provider/Compte'
import Order from './pages_provider/order'
import Offer from './pages/Offer'
import DeliveryOne from './pages_provider/DeliveryOne'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import ConfirmT from './pages_provider/ConfirmT'
import Location from './pages/Location'
import Categories from './pages/Categories'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Redirect />} />
          <Route exact path="/SignParticular" element={<SignParticular />} />
          <Route exact path="/HomePage" element={<HomePage />} />
          <Route exact path="/Requetes/:id" element={<Requetes />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/RegisterP" element={<RegisterP />} />
          <Route exact path="/Command" element={<Command />} />
          <Route exact path="/Compte" element={<Compte />} />
          <Route exact path="/Order" element={<Order />} />
          <Route exact path="/Offer" element={<Offer />} />
          <Route exact path="/DeliveryOne" element={<DeliveryOne />} />
          <Route exact path="/ConfirmT" element={<ConfirmT />} />
          <Route exact path="/Location" element={<Location />} />
          <Route exact path="/Categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
