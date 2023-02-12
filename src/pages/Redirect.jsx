import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import utyLogo from '../assets/logo-uty.png'
import first from '../assets/deskOne.png'
import HomePage from './HomePage'
import ModalConnect from './ModalConnect'
import ModalProviderC from '../pages_provider/ModalProviderC'

function Redirect() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <div className="sub__container">
        <div className="uty__logo">
          <img src={utyLogo} alt="uty-logo" />
        </div>
        <p>Bienvenu chez uty</p>

        <button onClick={() => navigate('/HomePage')}>Start</button>
      </div>
      <div className="desktop__display">
        <div className="start__navbar">
          <div className="uty__logo">
            <img src={utyLogo} alt="uty-logo" />
          </div>
          <div className="sign__side">
            <span>A propos de nous</span>
            <span>Blog</span>
            <span>Dévenir livreur</span>
            <button className="login__button">Nous contacter</button>
          </div>
        </div>
        <div className="start__body">
          <div className="left__side">
            <div className="start__accroche">
              <h3>Bienvenu chez uty</h3>
              <p>Tout ce dont vous avez besoin en un click</p>
            </div>
            <div className="call__to__actions">
              <button
                className="ask__service"
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                Soumettre une requete
              </button>
              <button
                className="give__service"
                onClick={() => {
                  setOpen(true)
                }}
              >
                Répondre à une requete
              </button>
            </div>
          </div>
          <div className="right__side">
            <img src={first} alt="" />
          </div>
        </div>
        <div className="ads__side">
          <div className="accroche__desk">
            <h3>Les meilleurs services uty près de chez vous</h3>
            <p>Avec trouvez tout à tout à toute heure </p>
          </div>
          <HomePage />
        </div>
      </div>
      {isOpen && <ModalConnect setIsOpen={setIsOpen} />}
      {open && <ModalProviderC setOpen={setOpen} />}
    </Container>
  )
}

const Container = styled.div`
  @media all and (max-width: 800px) {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    .desktop__display {
      display: none;
    }
    .sub__container {
      background-color: white;
      height: 80vh;
      width: 80vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 1vh;
      border-radius: 1rem;
      .uty__logo {
        display: flex;
        justify-content: center;
        margin-top: -10vh;
        img {
          height: 25vh;
          width: 30vw;
        }
      }
      p {
        font-weight: bold;
        font-size: 150%;
        margin-top: 10vh;
        color: #7e7e80;
      }
      button {
        height: 10vh;
        width: 50vw;
        font-size: 200%;
        margin-top: 2.5vh;
        border: none;
        border-radius: 1rem;
        background-color: #020664;
        color: white;
        font-weight: bold;
      }
    }
  }

  @media all and (min-width: 992px) {
    /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
    .desktop__display {
      display: flex;
      flex-direction: column;
      /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
      padding-left: 2.5vw;
      padding-right: 2.5vw;
      .footer {
        display: flex;
        justify-content: center;
        background-color: black;
        color: white;
      }
      .start__navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
        position: sticky;
        top: 0vh;
        padding-right: 7.5vw;
        margin-top: -12.75vh;
        border: none;
        svg {
          font-size: 300%;
        }
        .uty__logo {
          display: flex;
          justify-content: center;
          align-self: flex-start;
          img {
            height: 7.55vh;
            width: 4.5vw;
            margin-top: 2vh;
          }
        }
        .sign__side {
          display: flex;
          align-items: center;
          span {
            color: #000;
            margin-right: 2vw;
          }
          button {
            width: 12.5vw;
            height: 6.5vh;
            border: none;
            border-radius: 0.5rem;
            color: white;
            font-size: 100%;
          }
          .signUp__button {
            background-color: orange;
            margin-right: 1vw;
          }
          .login__button {
            background-color: #020664;
          }
        }
      }
      .start__body {
        display: flex;
        justify-content: space-between;
        height: 95vh;
        align-items: center;
        padding-right: 7.5vw;
        padding-left: 7.5vw;
        .left__side {
          margin-right: 3.5vw;
          margin-left: -7.5vw;
          .start__accroche {
            margin-top: 20vh;
            h3 {
              font-size: 250%;
              color: #020664;
            }
            p {
              color: #7e7e80;
              font-size: 135%;
              font-weight: bold;
              margin-top: -2.5vh;
              margin-bottom: 4vh;
            }
          }
          .call__to__actions {
            display: flex;
            button {
              height: 10vh;
              width: 15vw;
              font-weight: bold;
              font-size: 100%;
              color: white;
              background-color: #020664;
              border: none;
              border-radius: 0.5rem;
              margin-bottom: 10vh;
            }
            .ask__service {
              background-color: orange;
              margin-right: 1vw;
            }
          }
        }
        .right__side {
          img {
            height: 70vh;
          }
        }
      }
      .ads__side {
        background-color: white;
        width: 100vw;
        padding-top: 2.75vh;
        margin-left: -10vw;
        .accroche__desk {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 2.75vh;
          h3 {
            font-size: 150%;
          }
          p {
            margin-top: -1.5vh;
          }
        }
      }
    }
    .sub__container {
      display: none;
    }
  }
`

export default Redirect
