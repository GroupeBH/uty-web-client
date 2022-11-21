import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Redirect from "./pages/Redirect";
import HomePage from "./pages/HomePage";

import Requetes from "./pages/Requetes";

import SignIn from "./pages/SignIn";
import SignParticular from "./pages/SignParticular"
import PreOrder from "./pages_provider/PreOrder";
import RegisterP from "./pages_provider/RegisterP";



function App() {
  return (
    
    <>
      <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Redirect/>}/>
       
        <Route exact path="/SignIn" element={<SignIn/>}/>
        <Route exact path="/SignParticular" element={<SignParticular/>}/>
        <Route exact path="/HomePage" element={<HomePage/>}/>
        <Route exact path="/Requetes" element={<Requetes/>}/>
        <Route exact path="/PreOrder" element={<PreOrder/>}/>
        <Route exact path="/RegisterP" element={<RegisterP/>}/>
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
