import React from 'react'
import styled from 'styled-components'
import Medias from '../Medias'
import { BiCopyright } from 'react-icons/bi'
import utyLogo from '../../assets/logo-uty.png'

function Footer() {
  return (
    <Container>
      <div className="social__media">
        <Medias />
      </div>
      <div className="uty__logo">
        <img src={utyLogo} alt="" />
      </div>
      <div className="copyright">
        <BiCopyright />
        <span>2023 GBH. All right reserved</span>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  .social__media {
    width: 90%;
    align-self: center;
    margin-bottom: 2vh;
  }
  .uty__logo {
    display: none;
  }
  .copyright {
    text-align: center;
    font-size: 55%;
  }
  @media all and (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2vh 5vw;
    .social__media {
      width: 20%;
    }
    .uty__logo {
      display: block;
      img {
        height: 5vh;
        width: 2.5vw;
      }
    }
    .copyright {
      align-self: center;
      width: 20%;
      font-size: 75%;
    }
  }
`

export default Footer
