import React, { useState } from 'react'
import styled from 'styled-components'
import utyLogo from '../assets/logo-uty.png'
import first from '../assets/deskOne.png'
import ModalConnect from './ModalConnect'
import decoback from '../assets/decoback.jpg'
import HomeBody from '../components/HomeBody'
import MenuHome from '../components/MenuHome'
import Medias from '../components/Medias'

function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container>
      <div className="homepage__body">
        <div className="navbar">
          <img src={utyLogo} alt="uty-logo" />
          <MenuHome />
        </div>
        <div className="home__body">
          <div className="cards">
            <HomeBody />
          </div>
          <div className="right__side">
            <img src={first} alt="" />
          </div>
        </div>
        <div className="footer">
          <div>
            <Medias />
          </div>
          <div className="copyright">
            <span>Solution by B-holding sarl</span>
          </div>
          <div></div>
        </div>
      </div>
      {isOpen && <ModalConnect setIsOpen={setIsOpen} />}
      {/* {isOpen && <ModalConnect setIsOpen={setIsOpen} />} */}
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  .homepage__body {
    display: flex;
    flex-direction: column;
    /* background-image: url(${decoback});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; */
    background-image: linear-gradient(to top, #e0e8f9 0%, #dbe8fa 100%);
    bottom: 0vh;
    height: 100vh;
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 7.5vh;
      padding: 2vh 5vw;
      position: sticky;
      top: 0vh;
      background-color: white;
      img {
        height: 7.5vh;
        width: 12.5vw;
        align-self: center;
        margin-left: 5vw;
      }
    }
    .home__body {
      display: flex;
      /* flex-direction: column;
      justify-content: center;
      align-items: center; */
      padding: 1vh 3.5vw;
      .right__side {
        display: none;
      }
      .cards {
        display: flex;
        flex-direction: column;
        margin-bottom: 5vh;
        margin-top: 2.5vh;
        gap: 2.5vh 1vw;
      }
    }
    .footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2vh 1vw;
      position: fixed;
      bottom: 0vh;
      width: 100%;
      /* height: 7.5vh; */
      color: white;
      font-weight: bold;
      font-size: 115%;
      background-color: black;
      padding: 3vh 1vw;
    }
  }

  //for desktop
  @media all and (min-width: 992px) {
    .homepage__body {
      width: 100%;
      background-image: linear-gradient(to top, #f5f7fc 0%, #f0f4fa 100%);
      .navbar {
        img {
          height: 7.5vh;
          width: 7.5vw;
        }
      }
      .home__body {
        display: flex;
        justify-content: space-between;
        .cards {
          display: flex;
          flex-direction: column;
          margin-bottom: 5vh;
          margin-top: 2.5vh;
          gap: 2.5vh 1vw;
        }
        .right__side {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          img {
            height: 65vh;
            width: 40vw;
          }
        }
      }
      .footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2vh 1vw;
        position: fixed;
        bottom: 0vh;
        width: 100%;
        /* height: 7.5vh; */
        color: white;
        font-weight: bold;
        font-size: 115%;
        background-color: black;
        padding: 3vh 1vw;
      }
    }
  }

  //for tablets
  @media all and (765px <= width < 992px) {
    .homepage__body {
      width: 100%;
      .home__body {
        display: flex;
        justify-content: center;
        align-items: center;
        .right__side {
          display: none;
        }
      }
      .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0vh;
        width: 100%;
        height: 7.5vh;
        color: white;
        font-weight: bold;
        font-size: 115%;
        background-color: black;
      }
    }
  }
`

export default Home
