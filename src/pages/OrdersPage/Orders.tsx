import React from 'react'
import { useUserContext } from '../../context/UserContext'

const Orders = () => {
    const { userInfo } = useUserContext();
  return (
    <div>
      Ordenes del cliente {userInfo?.firstName + ' ' + userInfo?.lastName}
    </div>
  )
}

export default Orders
