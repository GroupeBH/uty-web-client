import React from 'react'
import {
  FaInstagram,
  FaFacebookSquare,
  FaLinkedin,
  FaYoutube,
  FaSnapchatSquare,
  FaTwitterSquare,
  FaTiktok,
} from 'react-icons/fa'
import styled from 'styled-components'

function Medias() {
  return (
    <Container>
      <div className="medias">
        <a
          href="https://instagram.com/uty_app?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100085612274815&mibextid=b06tZ0"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookSquare />
        </a>
        <a
          href="https://www.linkedin.com/company/uty-inc/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.youtube.com/channel/UCxKPXRVv0zRteRZL8MHpGzg"
          target="_blank"
          rel="noreferrer"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.tiktok.com/@uty_app?_t=8efInH1WWgg&_r=1"
          target="_blank"
          rel="noreferrer"
        >
          <FaTiktok />
        </a>
        <a
          href="https://www.snapchat.com/add/uty_app?share_id=MzaitXbnbrY&locale=fr-FR"
          target="_blank"
          rel="noreferrer"
        >
          <FaSnapchatSquare />
        </a>
        <a
          href="https://twitter.com/UtyApp?t=cA-3OzxmAvLUEC38eMMKZg&s=08"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitterSquare />
        </a>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .medias {
    display: flex;
    justify-content: space-between;
    width: 35vw;
  }
  @media all and (765px <= width < 992px) {
    .medias {
      width: 85vw;
    }
  }
`

export default Medias
