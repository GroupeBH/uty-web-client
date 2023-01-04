import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { IoClose, IoDocumentAttach, IoImage } from 'react-icons/io5'
import Commande from '../assets/Articles vendus.png'
import moment from 'moment'

function Proposition({ setIsClick, preOrder }) {
  const [selectedFile, setSelectedFile] = useState('')
  const [selectedTwo, setSelectedTwo] = useState('')
  const [selectedThree, setSelectedThree] = useState('')
  const [selectedDoc, setSelectedDoc] = useState('')
  const [docUrls, setDocUrls] = useState('')
  const fileOne = useRef(null)
  const fileTwo = useRef(null)
  const fileThree = useRef(null)
  const doc = useRef(null)
  const cloudName = 'disyacex9'

  const uploadImage = async () => {
    const propFiles = new FormData()
    propFiles.append('file', selectedFile)
    propFiles.append('file', selectedTwo)
    propFiles.append('file', selectedThree)
    // propFiles.append('file', selectedDoc)
    propFiles.append('upload_preset', 'utyweb')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        propFiles
      )
      setDocUrls(response.data.secure_url)
      console.log(docUrls)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    try {
      console.log('hello cloudinary')
      uploadImage()
    } catch (error) {
      console.log(error)
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
                {preOrder.image ? (
                  <img src={preOrder.image} className="preOrder__image" />
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
                  onChange={() => setSelectedFile(fileOne.current.files[0])}
                  ref={fileOne}
                />
                <p>{}</p>
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
              <input type="number" className="price__input" />
              <button onClick={(e) => handleClick(e)}>Soumettre</button>
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
    margin-top: -50vh;
    position: absolute;
    z-index: 0;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
    scrollbar-width: width;
    transform: translate(-0%, -100%);
    .proposition__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 10;
      height: 100vh;
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
          font-size: 125%;
          font-weight: bold;
          margin-bottom: 4.5vh;
        }
      }
    }
  }
`
export default Proposition
