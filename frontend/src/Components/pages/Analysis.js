import React from 'react'
// import PieChart from '../MarketComponents/PieChart'
import BuyBarChart from '../MarketComponents/BuyBarhart'
import SellBarChart from '../MarketComponents/SellBarChart'
import Saved from '../MarketComponents/Saved'
import ParentComponent from './ParentComponent'

const Analysis = () => {
  return (
    <>
      <div style={{marginTop:50}}>
      <ParentComponent/>
      </div>
    <div style={{ marginTop:70,marginInline:"auto",display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
    <div>
   
      <h2>Buy</h2>
    <BuyBarChart/>
    </div>
    <div>
      <h2>Sell</h2>
    <SellBarChart/>
    </div>
    </div>
    
    <Saved />
    
    </>
  )
}

export default Analysis