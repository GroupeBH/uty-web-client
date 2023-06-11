import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'

function ModalShip({ order, pickAdress, dropAdress, distance, setIsClick }) {
  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <IoClose onClick={() => setIsClick(false)} />
            <div className="item">
              <span className="item__title">Description</span>
              {order.commentaire ? (
                <span>{order.commentaire}</span>
              ) : (
                <span>Pas de commentaire sur cette commande</span>
              )}
            </div>
            <div className="item">
              <span className="item__title">Adresses</span>
              <div className="adress">
                <p>
                  collecte:
                  <span className="ship__info">{pickAdress}</span>
                </p>
                <p>
                  livraison:
                  <span className="ship__info">{dropAdress}</span>
                </p>
              </div>
            </div>
            <div className="item">
              <span className="item__title">Cout de la course</span>
              <p className="ship__info">{distance * 1500} fc</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .modal__back {
    background-color: rgba(0, 0, 0, 0.5);
    top: 100vh;
    height: 100vh;
    width: 100vw;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 100vh;
    .centered {
      margin-right: 5vw;
      margin-left: 5vw;
      .modal__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
        background-color: white;
        padding-right: 1vw;
        padding-left: 2vw;
        text-align: center;
        border-radius: 1rem;
        padding-bottom: 2.5vh;
        padding-top: 2.5vh;
        svg {
          font-size: 200%;
          align-self: flex-start;
        }
        .item {
          display: flex;
          flex-direction: column;
          gap: 1vh 1vw;
          align-items: start;
          margin-top: 2.5vh;
          background-color: #e8e4e4;
          height: 15vh;
          width: 85%;
          padding: 1.5vh 2.5vw;
          border-radius: 0.5rem;
          text-align: start;
          .item__title {
            font-weight: bold;
            font-size: 120%;
            color: #343232;
          }
          .adress {
            display: flex;
            flex-direction: column;
            p {
              margin-top: -1vh;
            }
          }
          .ship__info {
            font-size: 130%;
            color: #4f4d4d;
            font-weight: bold;
          }
        }
      }
    }
  }
`

export default ModalShip
