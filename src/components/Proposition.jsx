import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { IoClose } from 'react-icons/io5'

function Proposition({ setIsClick, id, description }) {
  console.log(id)
  useEffect(() => {
    const getPreOrders = async () => {
      const response = await axios.get(
        `http://localhost:5200/api/preOrder/getOne/${id}`
      )
      console.log(response.data)
    }
    getPreOrders()
  }, [])
  return (
    <Container>
      <div className="body__back">
        <div className="centered">
          <div className="proposition__body">
            <div className="form">
              <IoClose
                onClick={() => setIsClick(false)}
                className="close__icon"
              />
              <div className="image__add__header">
                <h5>{description}</h5>
                <h4 className="image__add__sec__title">Proposez un produit</h4>
                <div className="file__uploader">
                  <label htmlFor="file" className="label__file">
                    <button className="upload__button">
                      Ajouter des photos
                    </button>
                  </label>
                  <input
                    type="file"
                    className="product__image"
                    accept="image/*"
                  />
                </div>
              </div>
              <input type="text" name="" id="" />
              <input type="text" name="" id="" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .body__back {
    background-color: white;
    width: 100vw;
    height: 100vh;
    margin-top: -30vh;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: absolute;
    display: flex;
    justify-content: center;
    .proposition__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 10;
      .form {
        display: flex;
        flex-direction: column;
        .close__icon {
          font-size: 175%;
          align-self: flex-end;
        }
        .image__add__header {
          display: flex;
          align-items: center;
          .file__uploader {
            display: flex;
            position: relative;
            .label__file {
              .upload__button {
                background-color: orange;
                color: black;
                border: none;
                height: 6.5vh;
                border-radius: 1rem;
                font-size: 100%;
                font-weight: bold;
                color: white;
              }
            }
            .product__image {
              opacity: 0;
              position: absolute;
            }
          }
          .image__add__sec__title {
            color: #020664;
          }
        }
      }
    }
  }
`
export default Proposition
