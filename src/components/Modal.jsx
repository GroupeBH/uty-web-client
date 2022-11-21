import React from "react";
import styled from "styled-components";

function Modal({setIsOpen}){
    return(
        <Container>
          <div className="modal__back">
            <div className="centered">
                <div className="modal__body">
                    <h2>uty</h2>
                    <p>Merci d'utiliser uty
                    Votre demande est en traitement</p>
                    <button onClick={()=>setIsOpen(false)}>Ok</button>
                </div>
           </div>
          </div>
           
        </Container>
    )
}

const Container=styled.div`
    .modal__back{
        background-color: rgba(0, 0, 0, 0.5);
       
        width:100vw;
        height:100vh;
        z-index:0;
        transform: translate(-0%, -100%);
        position: absolute;
        margin-left:-5vw;
        display:flex;
        justify-content:center;
        align-items:center;
        .centered{
            background-color:white;
           padding-right:1vw;
           padding-left:2vw;
           text-align:center;
           margin-right:5vw;
           margin-left:5vw;
           border-radius:1rem;
           padding-bottom:2.5vh;
            .modal__body{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                z-index:10;
                h2{
                    color: #fa5343 ;
                    font-size:200%;
                }
                p{
                    margin-top:-2vh;
                    font-size:120%;
                    font-weight:bold;
                    color: #4f4b4b ;
                }
                button{
                    color:white;
                    background-color:blue;
                    border:none;
                    width:30vw;
                    height:7.5vh;
                    border-radius:1rem;
                    font-size:120%;
                    font-weight:bold;
                }

            }
        }
    }
`

export default Modal;