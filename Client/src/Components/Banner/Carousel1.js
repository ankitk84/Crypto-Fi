
// import React, { useEffect, useState } from 'react'
// import { CryptoState } from '../../CryptoContext';
// import { TrendingCoins } from '../config/api';
// import axios from 'axios';
// import AliceCarousel from 'react-alice-carousel';
// import { Link } from 'react-router-dom';
      
      
// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// const Carousel = () => {
//     const [trending, setTrend]= useState([]);
//     const {currency} = CryptoState("INR");
    
//     const fetchTrendingCoins = async()=>{
        
//     const {data} = await axios.get(TrendingCoins(currency));
//         console.log(data);
//         console.log(trending,"here is treading")
//         setTrend(data);
//     };

//     useEffect(()=>{
      
//         fetchTrendingCoins();
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[currency]);



//   return (
//     <>
   

    
//     <div>
//     {
//       trending.length>0?trending.map((data)=>{
//       let profit = data?.price_change_percentage_24h>=0;

      
//       return(
//         <>
        
//             <p>{data.name}</p>
//             <img src={data.image} alt={data.name}></img>
//             <span 
//              style={{color:profit>0?"rgb(14,203,129" : "red",
//              fontWeight:500,
//             }}
//              >
//               {profit && "+"}
//               {data?.price_change_percentage_24h?.toFixed((2))}
//             </span>
//             <span>
//               {numberWithCommas(data?.current_price.toFixed(2))}
//             </span>
//           </>
//       )
//      }):""
//     };
//     </div>
//     </>
//   )
// }

// export default Carousel

import React, { useEffect, useState, useContext } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import { CryptoContext } from '../MarketComponents/CryptoContext'

const Carousel1 = () => {
  const [trending, setTrending] = useState([]);
  const { currency } = useContext(CryptoContext);

  const TrendingCoins = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      )
        .then((res) => res.json())
        .then((json) => json);

      setTrending(data);
      console.log(data, 'trending data');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);


  

const items = trending.map((data)=>{
  let profit = data?.price_change_percentage_24h>=0;

  
  return(
    <>
       <div className="text-center border border-1 " >
       <img src={data.image} alt={data.name} style={{height:35, paddingTop:10}}></img>
        <div className="d-flex p-2 justify-content-center align-content-start flex-wrap">
        <p style={{paddingRight:10}}>{data.name}</p>  
        <span 
         style={{color:profit>0?"rgb(14,203,129" : "red",
         fontWeight:300,
        }}
         >
          {profit && "+"}
          {data?.price_change_percentage_24h?.toFixed((2))}
        </span>
         </div>
         {/* <span>
         {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: currency,
                        }).format(data.current_price)}
        </span> */}
       </div>
      
      </>
  )
 })

 const responsive = {
  0: {
    items: 2,
  },
  512: {
    items: 10,
  },
};


  return (
    <div style={{marginTop:20}} >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={3000}
        animationDuration={2000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );

  // return (
  //   <div>
  //     {trending.length > 0 ? (
  //       trending.map((data) => {
  //         console.log(data.name, 'trending data');
  //         return (
  //           <React.Fragment key={data.id}>
  //             <p>{data.name}</p>
  //               <img src={data.image} alt={data.name} style={{height:70}}></img>
  //           <div className="d-flex p-2 justify-content-center align-content-start flex-wrap">
  //           <p style={{paddingRight:10}}>{data.name}</p>  <span 
  //           //  style={{color:profit>0?"rgb(14,203,129" : "red",
  //           //  fontWeight:500,
  //           // }}
  //            >
  //             {/* {profit && "+"} */}
  //             {data?.price_change_percentage_24h?.toFixed((2))}
  //           </span>
  //           </div>
  //           <span>
  //            {data?.current_price.toFixed(2)}
  //           </span>
  //           </React.Fragment>
  //         );
  //       })
  //     ) : (
  //       null
  //     )}
  //   </div>
  // );
  
}

export default Carousel1;
