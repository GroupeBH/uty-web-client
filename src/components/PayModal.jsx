import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
// import { v4 as uuidv4 } from 'uuid'
import drc from '../assets/cd.svg'
import { usePayStore } from '../utils/payStore'

export default function PayModal({ price, userId }) {
  const navigate = useNavigate()
  const [phone, setPhone] = useState()
  let orderNumber = usePayStore((state) => state.orderNumber)
  let updateOrderNumber = usePayStore((state) => state.updateOrderNumber)

  let cardUrl = usePayStore((state) => state.cardUrl)
  let updateCardUrl = usePayStore((state) => state.updateCardUrl)
  const payByMobile = async () => {
    try {
      await axios
        .post('https://uty-ti30.onrender.com/api/payment/pay', {
          merchant: 'GBHOLDING',
          reference: 'TEST0014521',
          phone: phone,
          amount: `${price}`,
          callback_url: 'https://uty.life/Home',
        })
        .then((response) => {
          console.log(response)
          updateOrderNumber(response.data.data.orderNumber)
          console.log('pay', orderNumber)
        })

      await axios
        .post('https://uty-ti30.onrender.com/api/payment/checkPay', {
          orderNumber: orderNumber,
          user: userId,
        })
        .then(() => {
          navigate(`/invoice/${orderNumber}`)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const payByCard = async () => {
    try {
      await axios
        .post('https://uty-ti30.onrender.com/api/payment/pay', {
          merchant: 'GBHOLDING',
          reference: 'TEST0014521',
          amount: `${price}`,
          callback_url: 'https://uty.life/Home',
          approve_url: 'https://uty.life/Home',
          decline_url: 'https://uty.life/Home',
          cancel_url: 'https://uty.life/Home',
        })
        .then((response) => {
          console.log(response)
          console.log('card url:', response.data.data.url)
          console.log('order number:', response.data.data.orderNumber)
          updateCardUrl(response.data.data.url)
          updateOrderNumber(response.data.data.orderNumber)
          console.log(cardUrl, orderNumber)
          window.location.href = response.data.data.url
        })

      await axios
        .post('https://uty-ti30.onrender.com/api/payment/checkPay', {
          orderNumber: orderNumber,
          user: userId,
        })
        .then(() => {
          navigate(`/invoice/${orderNumber}`)
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
        <div className="label">Entrer votre numero mobile money :</div>
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
        <div className="pay__button">
          <button onClick={payByMobile}>Acheter par mobile money</button>
        </div>
        <div>
          <span>ou</span>
        </div>
        <div className="card__pay">
          <p onClick={payByCard}>Pay by card</p>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .pay__details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh 1vw;
    .label {
      display: flex;
      margin-left: -12.5vw;
    }
    .card__pay {
      display: flex;
      box-shadow: 0px 0px 5px #5b5e5e;
      width: 92.5%;
    }

    .input__field {
      display: flex;
      align-items: center;
      width: 90%;
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
