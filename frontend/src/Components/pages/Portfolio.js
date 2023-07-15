import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Portfolio from './Portfolio';
const Portfolio = () => {
  const navigate = useNavigate();
    const[Portfolio, setPortfolio] = useState({ data: { _id: '', walletBalance: '', Positions:[] } });

    const callPortfolio = async () => {
        try {
          const res = await fetch("https://crypto-fi.onrender.com/portfolio", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials:"include"
          });
    
          if (res.status === 401) {
            navigate('/SignIn');
            return;
          }

          const data = await res.json();
          console.log('data port', data);
          setPortfolio(data);
          
    
         

          if(!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
    
          }catch (err) {  
            console.log(err)
            navigate('/SignIn');
          }
         }
    
      useEffect(() => { 
        callPortfolio();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);



  return (
    <>
    <div style={{color:"black", margin:50}}>
    <div>Portfolio</div>
    <Portfolio />

    {/* <p>{Portfolio.data._id}</p>  */}
         <p style={{marginBottom:20}}>Remaining walletBalance:
           {/* {Portfolio.data.walletBalance} */}
         {typeof Portfolio.data.walletBalance === 'number' ? Portfolio.data.walletBalance.toFixed(3) : ''}

         </p>
      <table className="table border table-hover">
        <thead className="table-light"> 
          <tr>
            <th scope="col">#</th>
            <th scope="col">Asset Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Invested</th>
          </tr>
        </thead>
        <tbody>
        {Portfolio.data.Positions && Portfolio.data.Positions.length > 0 ? (
          Portfolio.data.Positions.map((position, index) => (
            
            <tr key={position._id || index}>
            <th scope="row">{index+1}</th>
            <td>{position.assetName}</td>
            <td>{position.quantity.toFixed(3)}</td>
            <td>{position.invested.toFixed(3)}</td>
          </tr>
            // <div key={position._id || index}>
            //   <p>{position.assetName}</p>
            //   <p>{position.quantity}</p>
            //   <p>{position.invested}</p>
            // </div>
          ))
        ) : (
          <p>No positions available</p>
        )}
         
        </tbody>
      </table>
       
         {/* <p>{Portfolio.data.Positions[0].assetName}</p> */}

         {/* {
            Portfolio.data>0?Portfolio.data.map((Positions, index)=> {
              return (
                <div key={Positions._id || index}>
                  <p>{Positions.assestName} </p>
                  <p>{Positions.quantity}</p>
                  </div>
                  )
                }):null
         } */}
        {/* {Portfolio.data.Positions && Portfolio.data.Positions.length > 0 ? (
          Portfolio.data.Positions.map((position, index) => (
            <div key={position._id || index}>
              <p>{position.assetName}</p>
              <p>{position.quantity}</p>
              <p>{position.invested}</p>
            </div>
          ))
        ) : (
          <p>No positions available</p>
        )} */}
        </div>
    </>
  )
}

export default Portfolio