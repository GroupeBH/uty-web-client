import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import utyLogo from "../assets/logo-uty.png"

function Redirect(){
   const navigate=useNavigate();
    return(
        <Container>
           <div className="sub__container">
             <div className="uty__logo">
                <img src={utyLogo} alt="uty-logo" />
             </div>
             <p>Bienvenu chez uty</p>

            <button onClick={()=>navigate("/HomePage")}>Start</button>
           </div>
        </Container>
    )
}

const Container=styled.div`
   height:100vh;
   width:100vw;
   display:flex;
   justify-content:center;
   align-items:center;
   background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);
   .sub__container{
     background-color:white;
     height:80vh;
     width:80vw;
     display:flex;
     flex-direction:column;
     justify-content:center;
     align-items:center;
     padding-top:1vh;
     border-radius:1rem;
     .uty__logo{
         display:flex;
         justify-content:center;
         margin-top:-10vh;
         img{
         height:25vh;
         width:30vw;
      }

     }
     p{
      font-weight:bold;
      font-size:150%;
      margin-top:10vh;
      color:  #7e7e80 ;
     }
     button{
        height:10vh;
        width:50vw;
        font-size:200%;
        margin-top:2.5vh;
        border:none;
        border-radius:1rem;
        background-color:  #020664  ;
        color:white;
        font-weight:bold;
     }
     
   }
`;

export default Redirect;