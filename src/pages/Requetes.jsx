import React, { useState } from 'react'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import axios from 'axios'
import { io } from 'socket.io-client'
import { Rings } from 'react-loader-spinner'
import {
  IoArrowBackSharp,
  IoPhonePortraitOutline,
  IoAddSharp,
} from 'react-icons/io5'
import { useStore } from '../utils/Store'
import ModalError from '../components/ModalError'

function Requetes() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate()
  const socket = useRef()
  const [selectedImg, setSelectedImg] = useState(null)
  const [phone, setPhone] = useState(null)
  const [picUrl, setPicUrl] = useState(null)
  const [url, setUrl] = useState(null)
  const [description, setDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [load, setLoad] = useState(false)
  const username = useStore((state) => state.username)

  const cloudName = 'disyacex9'
  const params = useParams()

  useEffect(() => {
    if (!username && !currentUser) {
      navigate('/SignParticular')
    }
  }, [username, currentUser])

  useEffect(() => {
    socket.current = io('http://localhost:5200')
    socket.current.emit('add-user', currentUser._id)
  }, [currentUser])

  useEffect(() => {
    if (selectedImg) {
      setPicUrl(URL.createObjectURL(selectedImg))
    }
  }, [selectedImg])

  const uploadImage = async () => {
    const picData = new FormData()
    picData.append('file', selectedImg)
    picData.append('upload_preset', 'utyweb')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        picData
      )
      setUrl(response.data.secure_url)
      console.log(url)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)
    const data = await JSON.parse(localStorage.getItem('currentUser'))
    console.log(data.username)
    console.log(data._id)
    try {
      await uploadImage()

      await axios.post('https://uty-ti30.onrender.com/api/order/addOrder', {
        description: description,
        image: url,
        sender: data._id,
        category: params._id,
      })

      setDescription('')
      setLoad(false)
      setIsOpen(true)
    } catch (error) {
      console.log(error)
      setLoad(false)
      setIsOpen(true)
    }
  }
  return (
    <Container>
      <div className="request__form">
        <IoArrowBackSharp
          className="return"
          onClick={() => navigate('/Categories')}
        />
        <h3>
          Salut <span className="username">{currentUser.username}</span>
          trouvons votre produit
        </h3>
        <hr />
        <div className="form__side">
          <div className="input__side">
            <span>Catégorie: {params.id}</span>
            <h4 className="input__label">Que voulez-vous?</h4>

            <textarea
              className="request__input"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Hey uty je veux ..."
            ></textarea>
            <div className="image__side">
              {!selectedImg ? (
                <div className="image__upload">
                  <input
                    type="file"
                    onChange={(e) => setSelectedImg(e.target.files[0])}
                    className="file"
                  />
                  <label htmlFor="file">
                    <IoAddSharp className="add__product" /> Ajouter une image
                  </label>
                </div>
              ) : (
                <div className="product_image">
                  <img src={picUrl} alt="product image" />
                </div>
              )}
            </div>
            <div className="phone">
              <IoPhonePortraitOutline />
              <input
                type="number"
                placeholder="Entrez votre numéro de téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <button onClick={(e) => handleSubmit(e)}>
            {load ? (
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
              <>Soumettre la requete</>
            )}
          </button>
        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      {open && <ModalError setIsOpen={setOpen} />}
    </Container>
  )
}

const Container = styled.div`
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 2.5vh;
  display: flex;
  flex-direction: column;
  .request__form {
    width: 100%;
    .return {
      font-size: 250%;
      font-weight: bold;
      margin-bottom: 2.5vh;
    }
    h3 {
      font-weight: semi-bold;
      text-align: center;
      span {
        color: orange;
        font-weight: bold;
        margin-right: 1vw;
      }
    }
    .phone {
      display: flex;
      align-items: center;
      border-radius: 0.5rem;
      box-shadow: 0px 0px 5px #5b5e5e;
      height: 6.5vh;
      width: 90vw;
      padding: 1vh 1vw;
      font-size: 120%;
      svg {
        font-size: 250%;
      }
      input {
        border: none;
      }
    }
    .form__side {
      background-color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .input__side {
        margin-top: 3.5vh;
        display: flex;
        flex-direction: column;
        gap: 2.5vh;
        .image__side {
          .product_image {
            img {
              height: 10vh;
              width: 20vw;
            }
          }
          .image__upload {
            align-self: center;
            position: relative;
            .file {
              opacity: 0;
              position: absolute;
              align-self: center;
            }
            label {
              background-color: orange;
              border-radius: 0.5rem;
              height: 7.5vh;
              color: white;
              font-weight: bold;
              font-size: 105%;
              padding-left: 1vw;
              padding-right: 1vw;
              width: 50vw;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: transform 0.2s ease-out;
              .add__product {
                font-size: 250%;
              }
            }
          }
        }
        .input__label {
          margin-bottom: 1vh;
        }
        .request__input {
          width: 90vw;
          height: 18.5vh;
          border-radius: 0.5rem;
          border: none;
          box-shadow: 0px 0px 2.5px #5b5e5e;
          box-sizing: border-box;
          margin-right: -5vw;
          resize: none;
          padding: 1vh 1vw;
        }
      }

      button {
        margin-top: 5vh;
        height: 10vh;
        background-color: #020664;
        color: white;
        font-size: 125%;
        font-weight: bold;
        border: none;
        border-radius: 0.5rem;
        margin-bottom: 7vh;
        width: 92.5vw;
      }
    }
  }
`

export default Requetes
