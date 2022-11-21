import React from "react";
import styled from "styled-components";
import Font from "react-font";
import { useNavigate } from "react-router-dom";



function First(){
    let navigate = useNavigate();
    
    return(
        <Container>
           <div className="first__page__titles">
             <Font family="Paytone One">
              <h1 className="first__page__title">uty</h1>
             </Font>
             <Font family="Inter"><h3 className="first__page__subtitle">Bienvenu chez Uty</h3></Font>
           </div>
           <button className="first__page__login__button" onClick={()=>navigate("/Redirect")}>Se connecter</button>
           <button className="first__page__sign_in__button"  onClick={()=>navigate("/Redirect")}><Font family="Inter">S'enregistrer</Font> </button>
        </Container>
        
    )
}


const Container=styled.div`
    background: rgba(255, 0, 0, 0.75);
    background:conic-gradient(from 90deg at 50% 50%, rgba(80, 2, 4, 0.92) 0%, rgba(133, 21, 24, 0.92) 19%, rgba(133, 21, 24, 0.92) 23%, rgba(133, 16, 19, 0.92) 30%, rgba(150, 17, 21, 0.92) 39%, rgba(80, 2, 4, 0.92) 48%, rgba(140, 11, 14, 0.92) 66%, rgba(133, 21, 24, 0.92) 76%, rgba(133, 21, 24, 0.92) 83%, rgba(147, 17, 20, 0.92) 89%, rgba(147, 17, 20, 0.92) 94%, rgba(147, 17, 20, 0.92) 96%, rgba(113, 5, 5, 1) 100%);
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding-left:40vw;
    .first__page__titles{
        text-align:center;
        color:white;
        margin-left:-40vw;
    }
    button{
        width:20vw;
        padding:2vh 1vw;
        border-radius:50px;
    }
    .first__page__sign_in__button{
        margin-top:1vh;
    }
    @media only screen and (max-width: 800px){
        .first__page__titles{
            .first__page__title{
                
                font-size:450%;

            }
            .first__page__subtitle{
                font-size:150%;
            }
        }
        button{
            width:60vw;
            height:10vh;
            border-radius:50px;
            margin-left:-20vw;
        }
        .first__page__login__button{
            margin-top:5vh;
            background-color:#0A0E43;
            color:white;
            font-size:150%;
          
        }
        .first__page__sign_in__button{
            margin-top:2vh;
            font-size:150%;
            color:#0A0E43;
        }
    }
`;
export default First;