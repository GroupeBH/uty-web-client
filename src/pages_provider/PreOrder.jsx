import React,{useState} from "react";
import styled from "styled-components";
import {IoMenu,IoNotifications} from "react-icons/io5";
import { useEffect } from "react";
import MenuProvider from "../components/MenuProvider"
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal"
import axios from "axios";
import utyLogo from "../assets/logo-uty.png"

function PreOrder(){
   
    const [drop,setDrop]=useState(false);
    let navigate = useNavigate();
    

    return(
        <Container>
            <div className="navbar">
                <div className="page__title" onClick={()=>navigate("/")}> 
                
                  <img src={utyLogo} alt="" className="uty__logo" />  
                </div>
                <IoNotifications className="notification__icon"/>
                <button onClick={()=>{setDrop(true)}}>
                   <IoMenu className="menu__icon" />
                </button>
                
            </div>
            <h3 className="provider__accroche">Pénètre ton marché différement</h3>
            <div className="list__post"></div>
            {drop && <MenuProvider setDrop={setDrop}/>}
            
        </Container>
    )
}

const Container=styled.div`
    padding-left:5vw;
    padding-right:5vw;
    display:flex;
    flex-direction:column;
    
    .navbar{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-right:-5vw;
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
            display:flex;
            justify-content:center;
            padding-top:1vh;
            .uty__logo{
                height:8vh;
                width:12.5vw;
            }
            
        }
        .notification__icon{
            font-size:260%;
        }
        .menu__icon{
                align-self:center;
                font-size:260%;
                margin-right:1vh;
            }
    }
    h3{
        text-align:center;
        font-size:125%;
    }

   
`;

export default PreOrder;