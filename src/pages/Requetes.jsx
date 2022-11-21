import React,{useState} from "react";
import styled from "styled-components";
import {IoPersonCircleOutline} from "react-icons/io5";
import {categories} from "../components/Categories"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal"
import axios from "axios";
import utyLogo from "../assets/logo-uty.png"

function Requetes(){
    const [selectedImg,setSelectedImg]=useState(null)
    const [picUrl,setPicUrl]=useState(null)
    const [url,setUrl]=useState(null)
    const [isOpen,setIsOpen]=useState(false)
    let navigate = useNavigate();

    const [values, setValues] = useState({
        description: '',
        category: '',
        url: '',
      });

    useEffect(()=>{
        if(selectedImg){
            setPicUrl(URL.createObjectURL(selectedImg))
        }
    },[selectedImg])

    const uploadImage=()=>{
        const picData = new FormData()
        picData.append("file",selectedImg)
        picData.append("upload_preset","utyweb")
        picData.append("cloud_name","disyacex9")

        axios.post(" https://api.cloudinary.com/v1_1/disyacex9/image/upload",{
            method:"post",
            body: picData
        })
        .then(response => response.json())
        .then(picData=>{
            setUrl(picData.url)
            console.log(picData)}
            )
        .catch(error=>console.log(error))
    }
    
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };
    const handleSubmit=(e)=>{
        e.preventDefault();
        uploadImage()
        setIsOpen(true)
      
    }
    return(
        <Container>
            <div className="navbar">
                <div className="page__title" onClick={()=>navigate("/Redirect")}> <img src={utyLogo} alt="" className="uty__logo" />  </div>
                <div className="count__container">
                    <button className="connect">Se deconnecter</button>
                    
                </div>
            </div>
            <form className="request__form" onSubmit={(e)=>handleSubmit(e)}>
                <h3>Salut Eugene, trouvons votre produit</h3>
                <div className="product__image">
                         <img src={picUrl} alt="" className="picture"/>
                    </div>
                    <input 
                      type="file" 
                      onChange={(e)=>setSelectedImg(e.target.files[0])}
                      className="file" />
                    <label htmlFor="file">
                        Ajouter une image
                    </label>
                <span>Que voulez-vous?</span>
                <textarea name="description" id="" 
                  cols="30" rows="10" 
                  className="request__input"
                  onChange={(e) => handleChange(e)}></textarea>
                
                <span>Sélectionnez la catégorie du produit</span>
                <select name="category" id="" onChange={(e) => handleChange(e)}>
                    <option value="" ></option>
                    {categories.map((cat)=>(
                        <option>
                            {cat}
                        </option>
                    ))}

                </select>

                <button type="submit">Soumettre la requete</button>
                


            </form>
            {isOpen && <Modal setIsOpen={setIsOpen}/>}
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
   .request__form{
     display:flex;
     flex-direction:column;
     h3{
        text-align:center;
        margin-top:2.5vh;
     }
     .file{
            opacity:0;
            align-self:center;
        }
        label{
            position:relative;
            background-color:blue;
            border-radius:1rem;
            height:6.5vh;
            color:white;
            font-weight:bold;
            width:50vw;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            transition: transform .2s ease-out;
            align-self:center;
        }
        input:hover + label, input:focus + label{
            transform:scale(1.02);
        }
        .product__image{
            height:15vh;
            width:30vw;
            margin-bottom:2vh;
            background-color:silver;
            display:flex;
            justify-content:center;
            align-self:center;
            .picture{
                height:15vh;

            }
        }
     
    span{
        margin-top:2.5vh;
        margin-bottom:1vh;
    }
    .request__input{
        width:90vw;
        height:7.5vh;
        border-color:black;
    }
    select{
        border-color:black;
        height:7.5vh;
    }
    button{
        margin-top:5vh;
        height:8vh;
        background-color:red;
        color:white;
        font-size:150%;
        font-weight:bold;
        border:none;
        border-radius:1rem;
        margin-bottom:7vh;
    }
     }

   
`;

export default Requetes;