import React from 'react'
import chip from './chip.png'
import logo from'./cryptofiwhite.png'
import './reset.css'
import './paycard.css'
import world from './world'
const PayCard = (props) => {
  return (
    <>
    
     <div class="cardx" style={{marginTop:10}}>
     <div class="w-100 " style={{position:"absolute", padding:10, marginLeft:-45}}>{world("rgba(0,0,0, 0.2)")}</div> 
      <div class="card-top " style={{height:50}}>
        <div class="card-title">CRYPTO FI</div>
       <div class="imagecryptofi"> <img  src={logo} alt="MasterCard"  /></div>

      </div>
      <div class="card-center">
        <img src={chip} alt="chip" />
      </div>
      <div class="card-bottom" style={{marginBottom:5}}>
        <div class="card-bottom-left">
          <div class="card-number">{props.number}</div>
          <div>{props.date}</div>
          <div class='name' style={{marginTop:0}}>{props.name}</div>
        </div>
        <div class="card-bottom-right" style={{marginTop:15}}>
          {/* <img src="./cryptofiwhite.png" alt="MasterCard" width="130" />  */}
          <div class="card-gh">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-wifi"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
            <path d="M9.172 15.172a4 4 0 0 1 5.656 0"></path>
            <path d="M6.343 12.343a8 8 0 0 1 11.314 0"></path>
            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"></path>
          </svg>
          </div>
          <span style={{textAlign: "center"}}>Virtual Card</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default PayCard