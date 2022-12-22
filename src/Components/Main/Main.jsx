import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Main({crrUser , removeData}) {
  return (
    <>
      <Navbar crrUser={crrUser} removeData={removeData} />
      <Outlet/>

    </>
  )
}
