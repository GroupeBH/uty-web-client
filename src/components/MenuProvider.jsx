import React from 'react'
import styled from 'styled-components'

function MenuProvider() {
  return (
    <Container>
      <div className="drop__back">
        <div className="right__menu">
          <ul className="items__menu">
            <li>Tableau de bord</li>
            <li>Profil</li>
            <li>Campagne</li>
            <li>Faire un don</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 0;
  transform: translate(-0%, -100%);
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  .right__menu {
    display: flex;
    flex-direction: column;
    background-color: white;
    .items__menu {
    }
  }
`

export default MenuProvider
