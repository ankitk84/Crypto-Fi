import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../config/api';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

      
      
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrend]= useState([]);
    const { currency, symbol } = CryptoState();
    
    const fetchTrendingCoins = async()=>{
        
    const {data} = await axios.get(TrendingCoins(currency));
        console.log(data);
        console.log(trending,"here is treading")
        setTrend(data);
    };

    useEffect(()=>{
      
        fetchTrendingCoins();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency]);



     const items = trending.map((data)=>{
      let profit = data?.price_change_percentage_24h>=0;

      
      return(
        <>
           
          <div >
          <img src={data.image} alt={data.name} style={{height:70}}></img>
            <div className="d-flex p-2 justify-content-center align-content-start flex-wrap">
            <p style={{paddingRight:10}}>{data.name}</p>  <span 
             style={{color:profit>0?"rgb(14,203,129" : "red",
             fontWeight:500,
            }}
             >
              {profit && "+"}
              {data?.price_change_percentage_24h?.toFixed((2))}
            </span>
            </div>
            <span>
            {symbol} {numberWithCommas(data?.current_price.toFixed(2))}
            </span>
          </div>
          </>
      )
     })
  
     const responsive = {
      0: {
        items: 2,
      },
      512: {
        items: 4,
      },
    };
  
   
      return (
        <div  >
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={200}
            animationDuration={200}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
           
            
          />
        </div>
      );
}

export default Carousel



const items = trending.map((data)=>{
  let profit = data?.price_change_percentage_24h>=0;

  
  return(
    <>
       
        <img src={data.image} alt={data.name} style={{height:70}}></img>
        <div className="d-flex p-2 justify-content-center align-content-start flex-wrap">
        <p style={{paddingRight:10}}>{data.name}</p>  <span 
         style={{color:profit>0?"rgb(14,203,129" : "red",
         fontWeight:500,
        }}
         >
          {profit && "+"}
          {data?.price_change_percentage_24h?.toFixed((2))}
        </span>
        </div>
        <span>
        {data?.current_price.toFixed(2)}
        </span>
      </>
  )
 })

 const responsive = {
  0: {
    items: 2,
  },
  512: {
    items: 4,
  },
};


  return (
    <div >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );