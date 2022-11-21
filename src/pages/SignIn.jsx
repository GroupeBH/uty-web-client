import React, { useState,useEffect } from "react";
import styled from "styled-components";
import {IoArrowBackOutline} from "react-icons/io5"
import Font from "react-font";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function SignIn(){
    let navigate = useNavigate();
    const[data,setData]=useState([]);
    
   
    function HandleClick(e){
        // if(e.target.value="Personne physique"){navigate("/SignParticular")};
        // if(e.target.value="Personne morale"){navigate("/SignCorporate")};
        e.preventDefault();
        switch (e.target.value) {
            case 'Personne physique':
                navigate("/SignParticular")
              break;
            case 'Personne morale':
                navigate("/SignCorporate")
              // expected output: "Mangoes and papayas are $2.79 a pound."
              break;
            default:
              console.log("Sorry, we are out ");
          }

    }
    useEffect(()=>{
        
       axios.get('https://restcountries.com/v3.1/all')
        .then((res) => {
            console.log(res.data);
            setData(res.data);
        })
    });


    return(
        <Container>
           <IoArrowBackOutline onClick={()=>navigate("/")}/>
           <Font family="Paytone One">
              <h1 className="sign__in__page__title">uty</h1>
           </Font>
           <Font family="Inter">
              <h3 className="sign__in__page__subtitle">S'enregistrer</h3>
           </Font>
           <label htmlFor="text">Choix du pays de résidence</label>
           <select 
                name="country" 
                id="" 
                
                className="country__select"
            >
                <option value=""></option> 
                {data.map((country)=>(
                    <option>
                        <img src={country.flags.png} alt="drapeau"/>
                        {country.name.common}
                    </option>
                ))
                    
                }
            </select>

            <label htmlFor="text">Type de client</label>
            <select name="" id="" 
              className="personnality__select"
             
              onClick={HandleClick}
            >
                <option value=""></option>
                <option value="Personne physique" >Personne physique</option>
                <option value="Personne morale">Personne morale</option>
            </select>
           <button className="sign__in__page__button" >Continuer</button>
        </Container>
    )
}

const Container=styled.div`
    svg{
        font-size:250%;
    }
    .sign__in__page__title{
       font-size:400%;
       color:rgba(255, 0, 0, 0.75);
       text-align:center;
    }
    .sign__in__page__subtitle{
        font-size:150%;
        text-align:center;
        margin-bottom:8.5vh;
        color:#0A0E43;
    }
    .sign__in__page__button{
        height:10vh;
        width:90vw;
        background-color:#0A0E43;
        color:white;
        font-size:150%;
        margin-left:5vw;
        border-radius:50px;
        margin-top:5vh;
        margin-bottom:2.5vh;
    }
    label{
        margin-left:5vw;
        color:#0A0E43;
    }
    .country__select{
        background-color:white;
        width:90vw;
        height:7.5vh;
        margin-left:5vw;
        margin-top:1.5vh;
        margin-bottom:3.5vh;
        padding-left:2vw;
        border-radius:15px;
        font-size:100%;
        color:#0A0E43;
    }
    .personnality__select{
        background-color:white;
        width:90vw;
        height:7.5vh;
        margin-left:5vw;
        margin-top:1.5vh;
        padding-left:2vw;
        border-radius:15px;
        font-size:100%;
        color:#0A0E43;

    }
`;

export default SignIn;