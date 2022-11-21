import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Redirect from "./pages/Redirect";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Requetes from "./pages/Requetes";

import SignIn from "./pages/SignIn";
import SignParticular from "./pages/SignParticular"



function App() {
  return (
    
    <>
      <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Redirect/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/SignIn" element={<SignIn/>}/>
        <Route exact path="/SignParticular" element={<SignParticular/>}/>
        
        <Route exact path="/HomePage" element={<HomePage/>}/>
        <Route exact path="/Requetes" element={<Requetes/>}/>
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
