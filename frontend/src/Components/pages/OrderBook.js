// import React,{useState, useEffect}  from 'react'
// import Portfolio from './Portfolio';
// import { Pagination } from '@mui/material';

// const OrderBook = () => {
//     const [orderBook, setOrderBook] = useState([]);
//     const [page, setPage] = useState(1);
    
//     const callOrderBook = async () => {
//         try {
//             const res = await fetch("http://localhost:8000/orderbook", {
//                 method: "GET",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json"
//                 },
//                 credentials:"include"
//             })
            
            
//             const data = await res.json();
//             console.log('data orderBook', data);
//             // const dataArray = Object.values(data);
//             // setOrderBook(dataArray);
//             // console.log(dataArray, 'dataArray')
//             setOrderBook(data.data.reverse());

//             if (!res.status === 200) {
//                 const error = new Error(res.error);
//                 throw error;
//             }

//         }catch (err) {
//             console.log(err)

//         }
//     }

//     useEffect(() => {
//         callOrderBook();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[]);


//   return (
//    <>
//         <div>OrderBook</div>
//          {/* <div className="container"  */}
//         {/* //  style={{display:"flex"}} */}
//          {/* > */}

//         {
//             orderBook? (

//                       <table class="table table-hover w-50 border ">
//                           <thead class="table-light">
//                               <tr>
//                                   <th scope="col">Sr No.</th>
//                                   <th scope="col">Asset Name</th>
//                                   <th scope="col">Quantity</th>
//                                   <th scope="col">Price (USD)</th>
//                                   <th scope="col">Time</th>
//                                   <th scope="col">Transaction Id</th>
//                                   <th scope="col">Type</th>
//                               </tr>
//                           </thead>
//                           <tbody>
//                               {
//                                 //   orderBook.length > 0 ?
//                                    orderBook.map((data, index) => {
//                                       return (
//                                           <>
//                                               <tr key={data.id || index}>
//                                                   <th scope="row">{index + 1}</th>
//                                                   <td>{data.assetName}</td>
//                                                   <td>{data.quantity}</td>
//                                                   <td>{data.rate}</td>
//                                                   <td>{data.time}</td>
//                                                   <td>{data._id}</td>
//                                                   <td>{data.Type}</td>
//                                               </tr>
//                                           </>
//                                       );
//                                   }) 
//                                 //   : ""
//                               }
//                           </tbody>
//                       </table>
//             )
//             :(
//                 <div>Loading...</div>
//             )}

//     {orderBook && (
//         <Pagination
//           count={Math.ceil(orderBook.length / 10)}
//           page={page}
//           onChange={(e, value) => setPage(value)}
//           style={{ marginTop: "2rem" }}
//         />
//       )}    
           
//         {/* </div> */}
  

//    </>
//   )
// }

// export default OrderBook

 
// import React, { useState, useEffect } from 'react';
// import { Pagination } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const OrderBook = () => {
//   const [orderBook, setOrderBook] = useState([]);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(7);
//   const navigate = useNavigate();

//   const callOrderBook = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/orderbook", {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         credentials: "include"
//       });

//       const data = await res.json();
//       console.log('data orderBook', data);
//       if (Array.isArray(data.data)) {
//         setOrderBook(data.data.reverse());
//       }

//       if (res.status === 401) {
//         navigate('/SignIn');
//         return;
//       }

//       if (!res.status === 200) {
//         const error = new Error(res.error);
//         throw error;

//       }

//     } catch (err) {
//       console.log(err);
//       navigate('/Signin');
//     }
//   }

//   useEffect(() => {
//     callOrderBook();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const getPageData = () => {
//     const startIndex = (page - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;
//     return orderBook.slice(startIndex, endIndex);
//   };



//   const calculateSerialNumber = (index) => {
//     return index + 1 + (page - 1) * rowsPerPage;
//   };

//   return (
//     <>
//     <div className="mt-5 mx-5" style={{justifyContent:"center"}}>
//       <div>OrderBook</div>

//       {orderBook ? (
//         <div>
//           <table className="table table-hover border">
//             <thead className="table-light">
//               <tr>
//                 <th scope="col">Sr No.</th>
//                 <th scope="col">Asset Name</th>
//                 <th scope="col">Quantity</th>
//                 <th scope="col">Price (USD)</th>
//                 <th scope="col">Time</th>
//                 <th scope="col">Transaction Id</th>
//                 <th scope="col">Type</th>
//               </tr>
//             </thead>
//             <tbody>
//               {getPageData().map((data, index) => (
//                 <tr key={data.id || index}>
//                   <th scope="row">{calculateSerialNumber(index)}</th>
//                   <td>{data.assetName}</td>
//                   <td>{data.quantity}</td>
//                   <td>{data.rate}</td>
//                   <td>{data.time}</td>
//                   <td>{data._id}</td>
//                   <td>{data.Type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <Pagination
//             count={Math.ceil(orderBook.length / rowsPerPage)}
//             page={page}
//             onChange={handleChangePage}
//             style={{ marginTop: "2rem" }}
//           />
//         </div>
//       ) : (
//         <div>Loading...</div>
//       )}
//       </div>
//     </>
//   )
// }

// export default OrderBook;


import React, { useState, useEffect,useContext } from 'react';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import ParentComponent from './ParentComponent';
import { TotalContext } from '../MarketComponents/TotalContext';
const OrderBook = () => {
  const [orderBook, setOrderBook] = useState([]);
  const [filteredOrderBook, setFilteredOrderBook] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState('');
  const navigate = useNavigate();
  // const [totalBuy, setTotalBuy] = useState(0);
  // const [totalSell, setTotalSell] = useState(0);
  // const show=false;
  const { setTotalValues } = useContext(TotalContext);


  const callOrderBook = async () => {
    try {
      const res = await fetch("https://crypto-fi.onrender.com/orderbook", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log('data orderBook', data);
      if (Array.isArray(data.data)) {
        setOrderBook(data.data);
        setFilteredOrderBook(data.data.reverse());
      }

      if (res.status === 401) {
        navigate('/SignIn');
        return;
      }

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;

      }

    } catch (err) {
      console.log(err);
      navigate('/Signin');
    }
  }

  useEffect(() => {
    callOrderBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleTypeFilter = (event) => {
    const selectedType = event.target.value;
    setTypeFilter(selectedType);
    if (selectedType === '') {
      setFilteredOrderBook(orderBook);
    } else {
      const filteredData = orderBook.filter(data => data.Type === selectedType);
      setFilteredOrderBook(filteredData);
    }
    setPage(1); // Reset page number when applying the filter
  };

  const getPageData = () => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredOrderBook.slice(startIndex, endIndex);
  };

  const calculateSerialNumber = (index) => {
    return index + 1 + (page - 1) * rowsPerPage;
  };

  useEffect(() => {
    // Calculate total buy and total sell amounts
    let totalBuyAmount = 0;
    let totalSellAmount = 0;
    filteredOrderBook.forEach(data => {
      if (data.Type === 'buy') {
        totalBuyAmount += data.rate * data.quantity;
      } else if (data.Type === 'sell') {
        totalSellAmount += data.rate * data.quantity;
      }
    });
       // ParentComponent({ totalBuy: totalBuyAmount, totalSell: totalSellAmount });
    // setTotalBuy(totalBuyAmount);
    // setTotalSell(totalSellAmount);
    setTotalValues(totalBuyAmount, totalSellAmount);
    console.log(totalBuyAmount, totalSellAmount, 'totalBuyAmount, totalSellAmount')
    // TotalContext.Consumer((context) => {
    //   context.setTotalValues(totalBuyAmount, totalSellAmount);
    // });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOrderBook]);


  return (
    <>
      <div className=" w-100 mt-5 mx-3" style={{ justifyContent: "center" }}>
        <div>OrderBook</div>

        {orderBook ? (
          <div>
            <div className="my-3">
              <label htmlFor="typeFilter" className="form-label">Filter by Type:</label>
              <select id="typeFilter" className="form-select" value={typeFilter} onChange={handleTypeFilter}>
                <option value="">All</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>

            <table className="table table-hover border">
              <thead className="table-light">
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Asset Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price (USD)</th>
                  <th scope="col">Time</th>
                  <th scope="col">Transaction Id</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {getPageData().map((data, index) => (
                  <tr key={data.id || index}>
                    <th scope="row">{calculateSerialNumber(index)}</th>
                    <td>{data.assetName}</td>
                    <td>{data.quantity}</td>
                    <td>{data.rate}</td>
                    <td>{data.time}</td>
                    <td>{data._id}</td>
                    <td>{data.Type}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            

            <Pagination
              count={Math.ceil(filteredOrderBook.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              style={{ marginTop: "2rem" }}
            />

            {/* <div className="mt-3">
              <div>Total Buy: {totalBuy}</div>
              <div>Total Sell: {totalSell}</div>
            </div>
             <ParentComponent/>  */}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  )
}

export default OrderBook;
