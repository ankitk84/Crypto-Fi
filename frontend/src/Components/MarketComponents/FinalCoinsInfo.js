// import React from 'react'
// import { createPortal } from 'react-dom'
// import { useNavigate, useParams } from 'react-router-dom';
// const FinalCoinsInfo = () => {


//     let navigate = useNavigate();
//     const close = () => {
//         navigate("..");
//     };
//   return (
//    <>
// {createPortal (
//         <div className="position-fixed top-50 start-50 translate-middle w-75 h-75 m-25 bg-black bg-opacity-50" >

//         <div className="card-body "  >
//         <h5 className="card-title" >vdbdBuy</h5>    

  
//             <button className="btn btn-primary" style={{width:70}} onClick={close}>Close</button>
//         </div>
//         </div>, 
//         document.getElementById('m1-root')
//     )}
//    </>
//   )
// }

// export default FinalCoinsInfo




import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom';
import { CryptoContext } from './CryptoContext';
// import { createPortal } from 'react-dom';
import FinalChart from './FinalChart';
import CandleChart from './CandleChart';
// import CurrencyConverter from './CurrencyConverter';
// import Sell from './Sell';
import Currencyconvert from './Currencyconvert';
import './Dropdown.css';
import { BsFillCaretDownFill } from "react-icons/bs";
import Websocketcode3 from './Websocketcode3';
// import CoinData from './CoinData';
import CoinsInfo from './CoinsInfo';
import Trending from '../pages/Trending';
import TechnicalIndicators from './TechnicalIndiactors';
const FinalCoinsInfo = () => {

    let {id} = useParams();
    // let navigate = useNavigate();
    let {getCoinData, coinData:data} = useContext(CryptoContext);
    
    // const [chartData, setChartData] = useState();
    const [days, setDays] = useState(7);
    const [type, setType] = useState("prices");
    const [chartType, setChartType] = useState("line");

    const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

    useEffect(() => {
    
       console.log(id, 'coininfo');   
       
        getCoinData(id);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

  //   const [isSellComponentVisible, setSellComponentVisible] = useState(false);

  // const handleSellClick = () => {
  //   setSellComponentVisible(true);
  // };


  return (
    <>
    <div>

        <div class="border border-warning-subtle" style={{display:"flex",justifyContent:"space-between", marginLeft:"auto", marginRight:"auto", width:600, paddingLeft:10, paddingRight:10, marginTop:20}}>
        <div class="dropdown">
          <button class="dropbtn">Price</button>
          <div class="dropdown-content">
            {/* <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a> */}
            <button
          className={`text-sm py-0.5 px-1.5 rounded capitalize
           ${
            type === "prices"
              // ? "bg-cyan text-cyan"
              // : "bg-gray-200 text-gray-100"
          }
          `}
          onClick={() => setType("prices")}
        >
          Price
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "market_caps"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("market_caps")}
        >
          market caps
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "total_volumes"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("total_volumes")}
        >
          total volumes
        </button>
          </div>
        </div>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 1 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(1)}
        >
          1d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 7 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <div class="dropdown">
          <button class="dropbtn">
          <BsFillCaretDownFill/>
          </button>
          <div class="dropdown-content">
            {/* <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a> */}
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 1 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(1)}
        >
          1d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 7 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 30 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(30)}
        >
          30d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 60 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(60)}
        >
          60d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 90 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(90)}
        >
          90d
        </button>
          </div>
        </div>
        

      

 <button onClick={() => { setChartType('line'); toggleTab(1); }}>Line</button>
      <button onClick={() =>{ setChartType('area'); toggleTab(1); }}>Area</button>
      <button onClick={() =>{ setChartType('bar'); toggleTab(1); }}>Bar</button>
      <button onClick={() => toggleTab(2)}>candle</button>
      <button onClick={() => toggleTab(3)}>Indicators</button>
      </div>
      <div style={{display:"flex"}}>

      <Websocketcode3 />
         {
            data && (
                // <FinalChart  id={data.id} days={days} type={type} chartType={chartType}/>
               <div className='w-50'style={{marginInline:20, marginTop:20}} >
                 {toggleState === 1 &&  <FinalChart  id={data.id} days={days} type={type} chartType={chartType}/> }
                 {toggleState === 2 &&  <CandleChart id={data.id} days={days}/>}
                  {toggleState === 3 &&  <TechnicalIndicators id={data.id} days={days} />}       

                <Currencyconvert id={id}/>
              {/* <Link to={`/${data.id}/buy`}
                    className="btn btn-primary" style={{width:70, border:3, backgroundColor:"chocolate"}}  >Buy</Link>  

                    <Link
                    //  to={`/${data.id}/sell`}
                    className="btn btn-primary" style={{width:70, border:3, backgroundColor:"chocolate"
                    }}  
                    onClick={handleSellClick}>Sell</Link>
                     {isSellComponentVisible && (
        createPortal(
          <Sell />,
          document.getElementById('m2-root')
        )
      )} */}
                </div>  
            )
         }
         {/* <CoinData id={id}/> */}
         <CoinsInfo id={id}/>
        </div>
    
         {/* <CurrencyConverter /> */}
       <div>
       <Trending/>
       </div>

    </div>
    
    
    
    
    
    </>
  )
}

export default FinalCoinsInfo