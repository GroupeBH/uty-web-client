import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { IoClose, IoImage } from 'react-icons/io5'
import Commande from '../assets/Articles vendus.png'
import moment from 'moment'
import { Rings } from 'react-loader-spinner'
import { useParams, useNavigate } from 'react-router-dom'
import { useShipmentStore } from '../utils/shipmentStore'
import BigImage from '../components/BigImage'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

function Proposition() {
  const params = useParams()
  const navigate = useNavigate()

  const getOrder = useShipmentStore((state) => state.updateOrder)
  const order = useShipmentStore((state) => state.order)
  const productWanted = useShipmentStore((state) => state.productWanted)
  const productWantedDesc = useShipmentStore((state) => state.productWantedDesc)

  const [images, setImages] = useState([])

  const [picClick, setPicClick] = useState(false)
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState('')
  const [commentaire, setCommentaire] = useState('')

  const readFileHandler = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImages((curr) => [...curr, reader.result])
      return reader.result
    }
  }

  const selectFilesHandler = async (e) => {
    const imagesData = []
    _.forEach(e.target.files, (file) => {
      imagesData.push(readFileHandler(file))
    })
    console.log(images)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = await JSON.parse(localStorage.getItem('currentProvider'))
    try {
      await axios
        .patch('https://uty-ti30.onrender.com/api/order/addProposition', {
          orderId: order._id,
          from: data._id,
          price: price,
          commentaire: commentaire,
          images: images,
        })
        .then((response) => console.log(response.data))

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrder(params.id)
  }, [params.id])
  return (
    <Container>
      <div className="proposition__body">
        <div className="form">
          <IoClose onClick={() => navigate('/Order')} className="close__icon" />
          <div className="order__details">
            {productWanted ? (
              <img
                src={productWanted}
                className="order__image"
                onClick={() => setPicClick(true)}
              />
            ) : (
              <img src={Commande} className="order__image" />
            )}
            <div className="order__description">
              <h5>Description</h5>
              <p>{productWantedDesc}</p>
              <span>
                {moment(Date.now()).format('MMM Do YY') ===
                moment(order.createdAt).format('MMM Do YY')
                  ? moment(Date.now()).format('h') ===
                    moment(order.createdAt).format('h')
                    ? moment(order.createdAt).fromNow()
                    : moment(Date.now()).format('h:s')
                  : moment(order.createdAt).format('DD/MM/YYYY  h:s')}
              </span>
            </div>
          </div>
          <hr />
          <div className="image__add__header">
            <h4 className="image__add__sec__title">Proposez un produit</h4>
          </div>
          <h6 className="price__title">Renseignez le prix de votre produit</h6>
          <input
            type="number"
            className="price__input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <h6 className="price__title">Ajoutez un commentaire</h6>
          <textarea
            className="comm__area"
            onChange={(e) => setCommentaire(e.target.value)}
          ></textarea>
          <h6 className="add__image__title">
            Ajoutez les images de votre produit
          </h6>
          <div className="image__frame1">
            <label htmlFor="file" className="label__file">
              <IoImage />
              <span className="label__name">Ajouter une image</span>
            </label>
            <input
              className="file"
              type="file"
              onChange={selectFilesHandler}
              accept="image/*"
              multiple
            />
          </div>
          <div className="product__image">
            {images.map((image) => (
              <img
                src={image}
                height={50}
                width={50}
                alt="products-images"
                key={uuidv4()}
              />
            ))}
          </div>
          <button onClick={(e) => handleClick(e)}>
            {loading ? (
              <>
                <div
                  className="loader"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '-2vh',
                  }}
                >
                  <Rings height="80" width="80" color="white" />
                </div>
              </>
            ) : (
              <>Soumettre</>
            )}
          </button>
        </div>
      </div>
      {picClick && (
        <BigImage imgSrc={productWanted} setPicClick={setPicClick} />
      )}
    </Container>
  )
}

const Container = styled.div`
  .proposition__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-bottom: solid;
    .form {
      display: flex;
      flex-direction: column;
      gap: 2vh;
      padding: 1vh 7.5vw;
      .image__frame1 {
        background-color: white;
        display: flex;
        position: relative;
        padding: 1vh 2vw;
        box-shadow: 0px 0px 5px silver;
        margin-bottom: 1vh;
        .label__file {
          display: flex;
          align-items: center;
          svg {
            color: orange;
            font-size: 250%;
          }
          .label__name {
            margin-left: 2.5vw;
            font-weight: semi-bold;
            font-size: 120%;
          }
        }
        .file {
          opacity: 0;
          position: absolute;
        }
      }
      .close__icon {
        font-size: 175%;
        align-self: flex-end;
      }
      .order__details {
        display: flex;
        flex-direction: column;
        padding: 1vh 1vw;
        align-items: center;
        img {
          background-color: #020664;
          height: 10vh;
        }
        .order__image {
          height: 20vh;
          width: 45vw;
          margin-left: -35vw;
          margin-bottom: 5vh;
        }
        .order__description {
          align-self: flex-start;
          h5 {
            margin-top: -1vh;
            margin-bottom: 2vh;
            font-size: 125%;
            color: #020664;
          }
          p {
            margin-top: -1vh;
            margin-bottom: 1vh;
            color: #7e7d7a;
          }
          span {
            color: orange;
          }
        }
      }
      .image__add__header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: -8.5vh;
        .image__add__sec__title {
          color: #020664;
          font-size: 130%;
        }
      }
      .product__image {
        img {
          height: 10vh;
          width: 15vw;
        }
      }
      .comm__area {
        width: 82.5vw;
        height: 18.5vh;
        border-radius: 0.5rem;
        border: none;
        box-shadow: 0px 0px 2.5px #5b5e5e;
        box-sizing: border-box;
        resize: none;
        padding: 1vh 1vw;
      }
      h6 {
        font-size: 105%;
        color: #7e7d7a;
        margin-bottom: -0.015vh;
      }
      .add__image__title {
        margin-top: 1vh;
      }
      .price__title {
        margin-top: -2vh;
      }
      .price__input {
        height: 6.5vh;
        border: none;
        box-shadow: 0px 0px 5px silver;
        padding-left: 2vw;
        border-radius: 0.5rem;
        margin-bottom: 2vh;
      }
      button {
        background-color: #020664;
        color: white;
        height: 10vh;
        border-radius: 0.5rem;
        font-size: 150%;
        font-weight: bold;
        margin-top: -2vh;
        margin-bottom: 3.5vh;
      }
    }
  }
`
export default Proposition
