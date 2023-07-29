import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { usePayStore } from '../utils/payStore'

const Invoice = () => {
  let params = useParams()

  console.log(params)

  let transaction = usePayStore((state) => state.transaction)
  let updateTransaction = usePayStore((state) => state.updateTransaction)

  useEffect(() => {
    updateTransaction(params)
  }, [params])

  return (
    <Container>
      <div className="invoice__header">{params.id}</div>
      <div className="invoice__content">
        {transaction.message}
        {transaction.channel}
      </div>
    </Container>
  )
}

const Container = styled.div``

export default Invoice
