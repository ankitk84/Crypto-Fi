import React, { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import world from '../Assets/World'
import PayCard from '../Card/PayCard'
// import OrderBook from './OrderBook';
import Portfolio from './Portfolio';
import PieChart from '../MarketComponents/PieChart';
// import BuyBarChart from '../MarketComponents/BuyBarhart';
// import SellBarChart from '../MarketComponents/SellBarChart';

const About = () => {
  
  const navigate = useNavigate();
  const [aboutUserData, setAboutUserData] = useState({});
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // const getShortId = (longId) => {
  //   // return longId.substring(0, 12);
  //   const spacedId = longId.substring(0, 16).replace(/(.{4})/g, '$1 ');
  //   return spacedId.trim();
  // };

  const getShortId = (longId) => {
    if (typeof longId !== 'string') {
      return ''; // or handle the case where longId is not a string
    }
  
    
    // const spacedId = longId.substring(0, 16).replace(/(.{4})/g, '$1 ');
    // return spacedId.trim();
    // const ss = longId.substring(0, 12);
    const visiblePart = longId.substring(0, 4);
    const asterisks = '*'.repeat(8);
    const spacedAsterisks = asterisks.match(/.{1,4}/g).join(' ');
    const agvisi = longId.substring(12, 16);
    const spacedId = visiblePart + ' ' + spacedAsterisks + ' ' + agvisi;
    return spacedId;
  };

  const callAboutPage = async () => {
    try {
      const res = await fetch("https://crypto-fi.onrender.com/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data,'about data');
      setAboutUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

      }catch (err) {  
        console.log(err)
        navigate('/Signin');
      }
     }


  useEffect(() => { 
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <>

    
    <div style={{display:"flex", flexWrap:"wrap"}}>
    <div style={{ marginTop:50, margin:50,  marginBottom:20}}>
    <PayCard 
               number={getShortId(aboutUserData._id)}
              // number={aboutUserData._id}
              name={aboutUserData.name}
              date={formatDate(aboutUserData.createdAt)}
           
           />
    </div>
    
    <div style={{marginTop:70}}>
    <PieChart/>
    </div>
    </div>
    <Portfolio />
      {/* <OrderBook /> */}
      {/* <Portfolio /> */}

            
            {/* <div className="card--world" style={{width:500}}>{world("rgba(0,0,0, 0.2)")}</div> */}

    </>

  )
}

export default About