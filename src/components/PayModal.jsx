import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _ from 'lodash'
// import { v4 as uuidv4 } from 'uuid'
import drc from '../assets/cd.svg'

export default function PayModal({ price }) {
  const [phone, setPhone] = useState()
  const payOrder = async () => {
    try {
      await axios.post('http://localhost:5200/api/payment/pay', {
        merchant: 'GBHOLDING',
        reference: 'TEST0014521',
        phone: phone,
        amount: `${price}`,
        callback_url: 'https://uty.life/Home',
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    let tel = '243' + _.toString(e.target.value)
    setPhone(tel)
  }
  return (
    <Container>
      <div className="pay__details">
        <label>Entrer votre numero mobile money</label>
        <div className="input__field">
          <div className="phone__prefix">
            <img src={drc} alt="drc lag" />
            <span>+243</span>
          </div>
          <div className="input__phone">
            <input
              type="number"
              placeholder="815060100"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="pay__button">
        <button onClick={payOrder}>acheter</button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .pay__details {
    display: flex;
    flex-direction: column;
    gap: 2vh 1vw;
    label {
      text-align: left;
      font-size: 110%;
    }
    .input__field {
      display: flex;
      align-items: center;
      .phone__prefix {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 5vh;
        padding: 1.5vh 2.5vw;
        background-color: #f0eded;
        box-shadow: 0px 0px 5px #5b5e5e;
        span {
          font-weight: semi-bold;
          font-size: 120%;
          margin-left: 1.5vw;
        }
        img {
          height: 1Ovh;
          width: 7.5vw;
          margin-top: -0.75vh;
        }
      }
      .input__phone {
        height: 5vh;
        /* background-color: silver; */
        padding: 1.5vh 2.5vw;
        box-shadow: 0px 0px 5px #5b5e5e;
        display: flex;
        align-items: center;
        input {
          height: 5.5vh;
          width: 95%;
          border: none;
          font-size: 120%;
        }
        input:focus {
          outline: none;
        }
      }
    }
  }
`
