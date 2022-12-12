import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'

function MenuDetails({ setIsUp }) {
  return (
    <Container>
      <div className="drop__back">
        <div className="drop__body">
          <IoClose onClick={setIsUp(false)} />
          <ul>
            <li>Profil</li>
            <li>My account</li>
            <li>Commandes</li>
            <li>Delivrery tracking</li>
          </ul>
          <button>Log out</button>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .drop__back {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: absolute;
    margin-left: -5vw;
    display: flex;
    align-items: center;
  }
  .drop__body {
    background-color: white;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
  }
`

export default MenuDetails
