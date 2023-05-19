import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { IoClose, IoDocumentAttach, IoImage } from 'react-icons/io5'
import Commande from '../assets/Articles vendus.png'
import moment from 'moment'
import { Rings } from 'react-loader-spinner'

function Proposition({ setIsClick, preOrder, setOpen }) {
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState('')
  const [selectedTwo, setSelectedTwo] = useState('')
  const [selectedThree, setSelectedThree] = useState('')
  const [selectedDoc, setSelectedDoc] = useState('')
  const [docUrlOne, setDocUrlOne] = useState('')
  const [docUrlTwo, setDocUrlTwo] = useState('')
  const [docUrlThree, setDocUrlThree] = useState('')
  const [price, setPrice] = useState('')
  const [commentaire, setCommentaire] = useState('')
  const fileOne = useRef(null)
  const fileTwo = useRef(null)
  const fileThree = useRef(null)
  const doc = useRef(null)
  const cloudName = 'disyacex9'

  const uploadImage = async () => {
    const propFileOne = new FormData()
    propFileOne.append('file', selectedFile)
    propFileOne.append('upload_preset', 'utyweb')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        propFileOne
      )
      setDocUrlOne(response.data.secure_url)
      console.log(docUrlOne)
    } catch (error) {
      console.error(error)
    }
    // second file upload
    const propFileTwo = new FormData()
    propFileTwo.append('file', selectedTwo)
    propFileTwo.append('upload_preset', 'utyweb')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        propFileTwo
      )
      setDocUrlTwo(response.data.secure_url)
      console.log(docUrlTwo)
    } catch (error) {
      console.error(error)
    }
    // third file upload
    const propFileThree = new FormData()
    propFileThree.append('file', selectedThree)
    propFileThree.append('upload_preset', 'utyweb')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        propFileThree
      )
      setDocUrlThree(response.data.secure_url)
      console.log(docUrlThree)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = await JSON.parse(localStorage.getItem('currentProvider'))
    try {
      await uploadImage()
      await axios
        .patch('https://uty-ti30.onrender.com/api/order/addProposition', {
          orderId: preOrder._id,
          from: data._id,
          imageOne: docUrlOne,
          imageTwo: docUrlTwo,
          imageThree: docUrlThree,
          price: price,
          commentaire: commentaire,
        })
        .then((response) => console.log(response.data))

      setLoading(false)
      setIsClick(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setIsClick(false)
      setOpen(true)
    }
  }
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
                {preOrder.wanted.media ? (
                  <img
                    src={preOrder.wanted.media}
                    className="preOrder__image"
                  />
                ) : (
                  <img src={Commande} />
                )}
                <div className="preOrder__description">
                  <p>{preOrder.wanted.text}</p>
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
              <h6>Ajoutez les images de votre produit</h6>
              <div className="image__frame1">
                <label htmlFor="file" className="label__file">
                  <IoImage />
                </label>
                <input
                  type="file"
                  className="product__image"
                  accept="image/*"
                  onChange={() => setSelectedFile(fileOne.current.files[0])}
                  ref={fileOne}
                />
                {selectedFile ? <p>{selectedFile.name}</p> : <p></p>}
              </div>
              <div className="image__frame1">
                <label htmlFor="file" className="label__file">
                  <IoImage />
                </label>
                <input
                  type="file"
                  className="product__image"
                  accept="image/*"
                  onChange={() => setSelectedTwo(fileTwo.current.files[0])}
                  ref={fileTwo}
                />
                {selectedTwo ? <p>{selectedTwo.name}</p> : <p></p>}
              </div>
              <div className="image__frame1">
                <label htmlFor="file" className="label__file">
                  <IoImage />
                </label>
                <input
                  type="file"
                  className="product__image"
                  accept="image/*"
                  onChange={() => setSelectedThree(fileThree.current.files[0])}
                  ref={fileThree}
                />
                {selectedThree ? <p>{selectedThree.name}</p> : <p></p>}
              </div>
              <div className="image__frame1">
                <label htmlFor="file" className="label__file">
                  <IoDocumentAttach />
                </label>
                <input
                  type="file"
                  className="product__image"
                  onChange={() => setSelectedDoc(doc.current.files[0])}
                  ref={doc}
                />
                {selectedDoc ? <p>{selectedDoc.name}</p> : <p></p>}
              </div>
              <h6 className="price__title">Renseignez le prix du produit</h6>
              <input
                type="number"
                className="price__input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <h6 className="price__title">Ajoutez un commentaire</h6>
              <textarea
                className="comm_area"
                onChange={(e) => setCommentaire(e.target.value)}
              ></textarea>
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
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .body__back {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-0%, -100%);
    top: 100vh;
    left: 0vw;
    right: 1vw;
    overflow-y: scroll;
    .centered {
      margin-top: 25vh;
      margin-bottom: 1.5vh;
      padding-top: 15vh;
      width: 90vw;
      height: 95vh;
      .proposition__body {
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        align-items: center;
        z-index: 10;
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
            height: 15vh;
            img {
              background-color: #020664;
              height: 10vh;
            }
            .preOrder__image {
              height: 10vh;
              width: 10vw;
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
            border-radius: 0.5rem;
            font-size: 125%;
            font-weight: bold;
            margin-top: 1.5vh;
            margin-bottom: 2.5vh;
          }
        }
      }
    }
  }
`
export default Proposition
