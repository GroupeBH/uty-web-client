import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { IoClose, IoDocumentAttach, IoImage } from 'react-icons/io5'
import Commande from '../assets/Articles vendus.png'
import moment from 'moment'
import AWS from 'aws-sdk'
import env from 'react-dotenv'

const S3_BUCKET = 'uty-mage'
const REGION = 'UE (Francfort) eu-central-1'

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_ID_KEY,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})

function Proposition({ setIsClick, preOrder }) {
  // const [imageProduct, setImageProduct] = useState()
  // console.log(imageProduct)
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState()

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    }
    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100))
      })
      .send((error) => {
        if (error) console.log(error)
      })
  }
  console.log(progress)
  useEffect(() => {
    const getPreOrders = async () => {
      const response = await axios.get(
        `http://localhost:5200/api/preOrder/getOne/${preOrder._id}`
      )
      console.log(response.data)
    }
    getPreOrders()
    console.log(preOrder)
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
              <div className="preOrder__details">
                {preOrder.image ? (
                  <img src={preOrder.image} />
                ) : (
                  <img src={Commande} />
                )}
                <div className="preOrder__description">
                  <p>{preOrder.description}</p>
                  <span>
                    {moment(Date.now()).format('MMM Do YY') ===
                    moment(preOrder.createdAt).format('MMM Do YY')
                      ? moment(Date.now()).format('h') ===
                        moment(preOrder.createdAt).format('h')
                        ? moment(preOrder.createdAt).fromNow()
                        : moment(Date.now()).format('h:s')
                      : moment(preOrder.createdAt).format('DD/MM/YYYY  h:s')}
                  </span>
                </div>
              </div>
              <div className="image__add__header">
                <h4 className="image__add__sec__title">Proposez un produit</h4>
              </div>
              <h6>Ajoutez lez images de votre produit</h6>
              <div className="image__frame1">
                <label htmlFor="file" className="label__file">
                  <IoImage />
                </label>
                <input
                  type="file"
                  className="product__image"
                  accept="image/*"
                />
              </div>
              <div className="image__frame1">
                <label htmlFor="file" className="label__file">
                  <IoImage />
                </label>
                <input
                  type="file"
                  className="product__image"
                  accept="image/*"
                />
              </div>
              <div className="image__frame1">
                <label htmlFor="file" className="label__file">
                  <IoImage />
                </label>
                <input
                  type="file"
                  className="product__image"
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </div>
              <div className="image__frame1">
                <label htmlFor="file" className="label__file">
                  <IoDocumentAttach />
                </label>
                <input type="file" className="product__image" />
              </div>
              <h6 className="price__title">Renseignez le prix du produit</h6>
              <input type="number" className="price__input" />
              <button onClick={() => uploadFile(selectedFile)}>
                Soumettre
              </button>
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
    margin-top: -30.5vh;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: fixed;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
    scrollbar-width: width;
    .proposition__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 10;
      .form {
        display: flex;
        flex-direction: column;
        gap: 2vh;
        padding: 1vh 2.5vw;
        .image__frame1 {
          background-color: white;
          display: flex;
          position: relative;
          padding: 1vh 2vw;
          box-shadow: 0px 0px 5px silver;
          margin-bottom: 1vh;
          .label__file {
            svg {
              color: orange;
              font-size: 250%;
            }
          }
          .product__image {
            opacity: 0;
            position: absolute;
          }
        }
        .close__icon {
          font-size: 175%;
          align-self: flex-end;
        }
        .preOrder__details {
          display: flex;
          box-shadow: 0px 0px 5px silver;
          padding: 1vh 1vw;
          align-items: center;
          img {
            background-color: #020664;
            height: 10vh;
          }
          p {
            margin-left: 1vw;
            margin-top: -1vh;
            margin-bottom: -0.5vh;
            color: #7e7d7a;
          }
          span {
            color: orange;
          }
        }
        .image__add__header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: -9.5vh;
          .image__add__sec__title {
            color: #020664;
            font-size: 130%;
          }
        }
        h6 {
          font-size: 105%;
          color: #7e7d7a;
          margin-bottom: -0.015vh;
        }
        .price__title {
          margin-top: -0.25vh;
        }
        .price__input {
          height: 6.5vh;
          border: none;
          box-shadow: 0px 0px 5px silver;
          padding-left: 2vw;
        }
        button {
          background-color: #020664;
          color: white;
          height: 7.5vh;
          font-size: 125%;
          font-weight: bold;
        }
      }
    }
  }
`
export default Proposition
