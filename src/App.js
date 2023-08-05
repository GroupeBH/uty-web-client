import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
// Initialisez Firebase avec votre configuration
// import Redirect from './pages/Redirect'
import Command from './pages_provider/Command'
import Requetes from './pages/Requetes'
import SignParticular from './pages/SignParticular'
import Dashboard from './pages_provider/Dashboard'
import Compte from './pages_provider/Compte'
import Order from './pages_provider/order'
import Offer from './pages/Offer'
import 'mapbox-gl/dist/mapbox-gl.css'
import ConfirmT from './pages_provider/ConfirmT'
// import Location from './pages/Location'
import Categories from './pages/Categories'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Shipments from './pages_driver/Shipments'
import { ShipDetails } from './pages_driver/ShipDetails'
import ProviderSignUp from './pages_provider/ProviderSignUp'
import DriverSignUp from './pages_driver/DriverSignUp'
import Proposition from './pages_provider/Proposition'
import BuyingModal from './components/BuyingModal'
import Invoice from './pages/Invoice'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/SignParticular" element={<SignParticular />} />
          <Route exact path="/Provider-sign-up" element={<ProviderSignUp />} />
          <Route exact path="/deliver-sign-up" element={<DriverSignUp />} />
          <Route exact path="/Requetes/:id" element={<Requetes />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/Command" element={<Command />} />
          <Route exact path="/Compte" element={<Compte />} />
          <Route exact path="/Order" element={<Order />} />
          <Route exact path="/Order/:id" element={<Proposition />} />
          <Route exact path="/Offer" element={<Offer />} />
          <Route exact path="/ConfirmT/:id" element={<ConfirmT />} />
          <Route exact path="/Categories" element={<Categories />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Shipments" element={<Shipments />} />
          <Route exact path="/Shipments/:id" element={<ShipDetails />} />
          <Route exact path="/Payment/:id" element={<BuyingModal />} />
          <Route exact path="/invoice/:id" element={<Invoice />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
