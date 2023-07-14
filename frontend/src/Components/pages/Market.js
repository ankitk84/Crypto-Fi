import React from 'react'
// import Banner from '../Banner/Banner';
import TableComponent from '../MarketComponents/TableComponent';
import Filters from '../MarketComponents/Filters';
import { Outlet } from 'react-router-dom';


const Market = () => {
  return (
   <>
  
  <div >
  <Filters />
   <TableComponent/>
  </div>
   <Outlet/>

   

   </>
  )
}

export default Market