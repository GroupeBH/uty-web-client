import React, { useState } from 'react'
import styled from 'styled-components'
import Commande from '../assets/Articles vendus.png'
import moment from 'moment'

function PreOrders({ preCommand, changeTrade }) {
  const [selectedTrade, setSelectedTrade] = useState(undefined)
  const changeCurrentTrade = (index, trade) => {
    setSelectedTrade(index)
    changeTrade(trade)
  }
  return (
    <Container>
      {preCommand.map((preCom, index) => {
        return (
          <div
            className={` preCommade ${
              index === selectedTrade ? 'selected' : 'normal'
            }`}
            key={preCom.id}
            onClick={() => changeCurrentTrade(index, preCom)}
          >
            <div className="image__precommand">
              {preCom.image ? (
                <img src={preCom.image} alt="precommand-image" />
              ) : (
                <img src={Commande} alt="default-image" />
              )}
            </div>
            <div className="preOrder__description">
              <h3 className="preOrder__name">{preCom.category}</h3>
              <p>{preCom.description}</p>
            </div>
            <span className="preOrder__date">
              <span>
                {moment(Date.now()).format('MMM Do YY') ===
                moment(preCom.createdAt).format('MMM Do YY')
                  ? moment(Date.now()).format('h') ===
                    moment(preCom.createdAt).format('h')
                    ? moment(preCom.createdAt).fromNow()
                    : moment(Date.now()).format('h:s')
                  : moment(preCom.createdAt).format('DD/MM/YYYY - h:s')}
              </span>
            </span>
          </div>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .normal {
    display: flex;
    padding: 1vh 2.5vw;
    align-items: center;
    border-color: silver 1px;
    background-color: silver;
    margin: 2vh 2vw;
    border-radius: 0.5rem;
    .preOrder__description {
      display: flex;
      flex-direction: column;
      flex-grow: 2;
      margin-left: 2.5vw;
      h3 {
        color: #020664;
      }
      p {
        margin-top: -2.5vh;
        width: 50vw;
      }
    }
    .preOrder__date {
      margin-right: 1vw;
      align-self: center;
    }
  }
`

export default PreOrders
