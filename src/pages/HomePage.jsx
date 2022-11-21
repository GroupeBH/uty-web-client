import React from "react";
import styled from "styled-components"
import Carousel, {CarouselItem} from "../components/Carousel"
import decoback from "../assets/decoback.jpg";
import utyLogo from "../assets/logo-uty.png"
import { useNavigate } from "react-router-dom";
import {IoSearch,IoPersonCircleOutline} from "react-icons/io5"
import ModalConnect from "./ModalConnect";
import Logout from "../components/Logout";
import { useState } from "react";


function HomePage(){
    let navigate = useNavigate();
    const [isOpen,setIsOpen]=useState(false)

    return(
        <Container>
            <div className="navbar">
                <div className="page__title" onClick={()=>navigate("/Redirect")}> <img src={utyLogo} alt="" className="uty__logo" />  </div>
                <div className="count__container">
                    <button className="connect">Se connecter</button>
                    
                </div>
            </div>
            <div className="search__bar">
                <input type="search" placeholder="Trouver un produit ou un service" className="input__search"/>
                <div className="search__icon">
                    <IoSearch />
                </div>
            </div>
            <div className="carousel__container">
                {/* <Carousel>
                    <CarouselItem>Item 1</CarouselItem>
                    <CarouselItem>Item 2</CarouselItem>
                    <CarouselItem>Item 3</CarouselItem>
                </Carousel> */}
                <div className="pub__container">
                    <p className="pub__message">
                        Découvrez le meilleur de la déco près de chez vous
                    </p>
                    <button className="pub__buttom">Voir plus</button>
                </div>
            </div>
            <div className="carousel__container">
                {/* <Carousel>
                    <CarouselItem>Item 1</CarouselItem>
                    <CarouselItem>Item 2</CarouselItem>
                    <CarouselItem>Item 3</CarouselItem>
                </Carousel> */}
                <div className="pub__container">
                    <p className="pub__message">
                        Découvrez le meilleur de la déco près de chez vous
                    </p>
                    <button className="pub__buttom">Voir plus</button>
                </div>
            </div>
            <div className="button__container">
              <button className="ask__service" onClick={()=>{setIsOpen(true)}}>Soumettre la requete</button>
              <button className="give__service">Répondre à une requete</button>
            </div>
            {isOpen && <ModalConnect setIsOpen={setIsOpen}/>}
            
        </Container>
    )
}

const Container=styled.div`
  
  @media all and (max-width: 800px){
  
    display:flex;
    width:100vw;
    flex-direction:column;
    
    
    .navbar{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-left:-5vw;
        background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
        padding:1vh 5vw;
        margin-bottom:2.5vh;
        .user__profil{
            display:flex;
            align-items:center;
            justify-content:space-between;
            color:#020664;
            background-color: white;
            border-radius:2rem;
            padding-left:2vw;
            padding-right:2vw;
            svg{
            font-size:150%;
            cursor:pointer;
        }
        }
       
        .page__title{
            padding-top:1vh;
            .uty__logo{
                height:8vh;
                width:12.5vw;
            }
        }
        .connect{
            font-size:110%;
            padding:2vh 2.5vw;
            border-radius:2rem;
            border:none;
            background-color:white;
            font-weight:bold;
           background-color: #FFC000;
           color:#020664;
        }
    }
    .search__bar{
        display:flex;
        margin-right:7.5vw;
        .input__search{
            margin-bottom:2vh;
            height:7.5vh;
            flex-grow:2;
        }
        .search__icon{
           display:flex;
           justify-content:center;
           align-items:center;
           background-color:#020664 ;
           height:7.5vh;
           width:15vw;
           cursor:pointer;
           svg{
             color:white;
             font-weight:bold;
             font-size:250%;
           }
        }
    }
    .carousel__container{
        display:flex;
        height:45vh;
        background-image:url(${decoback});
        background-size: contain;
        background-repeat: no-repeat;
        margin-right:7.5vw;
        .pub__container{
            display:flex;
            flex-direction:column;
            background-color:#020664 ;
            width:45vw;
            height:20vh;
            
            justify-content:center;
            margin-left:5vw;
            border-radius:1rem;
            color:white;
            font-weight:bold;
            opacity:70%;
            p{
             
                text-align:center;
                align-self:center;
                opacity:100%;
            }
            .pub__buttom{
                background-color:white;
                color:red;
                border:none;
                border-radius:0.5rem;
                width:30vw;
                height:5vh;
               
                align-self:center;
                font-weight:bold;
                cursor:pointer;
            }
        }
    }
    .button__container{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        position:fixed;
        margin-top:70vh;
        background-color:white;
        width:100vw;
        background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
        margin-left:-3.5vw;
        padding-top:3vh;
        padding-bottom:3vh;
        .ask__service{
        height:10vh;
        width:90vw;
        padding-left:6vw;
        padding-right:6vw;
        margin-top:-0.1vh;
        font-size:135%;
        font-weight:bold;
        border-radius:1rem;
        background-color: #020664 ;
        color:white;
        border:none;
        cursor:pointer;
    }
     .give__service{
        font-size:130%;
        padding-left:5vw;
        padding-right:4vw;
        width:90vw;
        background-color: #fb2f17;
     }
    }
    

  }
    display:flex;
    flex-direction:column;
    padding-left:3.5vw;
    padding-right:3.5vw;
    .navbar{
        svg{
            font-size:150%;
            cursor:pointer;
        }
        .page__title{
            font-size:300%;
            color:red;
            font-weight:bold
        }
    }
    .search__bar{
        display:flex;
        .input__search{
            margin-bottom:2vh;
            height:7.5vh;
            flex-grow:2;
        }
        .search__icon{
           display:flex;
           justify-content:center;
           align-items:center;
           background-color:black;
           height:7.5vh;
           width:15vw;
           cursor:pointer;
           svg{
             color:white;
             font-weight:bold;
             font-size:250%;
           }
        }
    }
    .carousel__container{
        display:flex;
        height:40vh;
        background-image:url(${decoback});
        background-size: contain;
        background-repeat: no-repeat;

        .pub__container{
            display:flex;
            flex-direction:column;
            background-color:blue;
            width:45vw;
            height:30vh;
            align-self:center;
            padding-top:5vh;
            margin-left:5vw;
            border-radius:1rem;
            color:white;
            font-weight:bold;
            opacity:70%;
            p{
                margin-bottom:5vh;
                text-align:center;
                align-self:center;
                opacity:100%;
            }
            .pub__buttom{
                background-color:red;
                color:white;
                border:none;
                border-radius:0.5rem;
                width:30vw;
                height:5vh;
                margin-top:-2.5vh;
                align-self:center;
                font-weight:bold;
                cursor:pointer;
            }
        }
    }
    .ask__service,.give__service{
        height:10vh;
        margin-top:5vh;
        font-size:150%;
        font-weight:bold;
        border-radius:1rem;
        background-color:blue;
        color:white;
        border:none;
        cursor:pointer;
    }

`;

export default HomePage;