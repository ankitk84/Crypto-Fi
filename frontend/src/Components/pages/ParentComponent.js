// import React, { useState, useEffect } from 'react';
// import { Pagination } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const OrderBook = ({ totalBuy, totalSell }) => {
//   const [orderBook, setOrderBook] = useState([]);
//   const [filteredOrderBook, setFilteredOrderBook] = useState([]);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(7);
//   const [typeFilter, setTypeFilter] = useState('');
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
//         setFilteredOrderBook(data.data.reverse());
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
//   };

//   useEffect(() => {
//     callOrderBook();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleTypeFilter = (event) => {
//     const selectedType = event.target.value;
//     setTypeFilter(selectedType);
//     if (selectedType === '') {
//       setFilteredOrderBook(orderBook);
//     } else {
//       const filteredData = orderBook.filter(data => data.Type === selectedType);
//       setFilteredOrderBook(filteredData);
//     }
//     setPage(1); // Reset page number when applying the filter
//   };

//   const getPageData = () => {
//     const startIndex = (page - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;
//     return filteredOrderBook.slice(startIndex, endIndex);
//   };

//   const calculateSerialNumber = (index) => {
//     return index + 1 + (page - 1) * rowsPerPage;
//   };

//   return (
//     <>
//       <div className="mt-5 mx-5" style={{ justifyContent: "center" }}>
//         <div>OrderBook</div>

//         <div className="my-3">
//           <label htmlFor="typeFilter" className="form-label">Filter by Type:</label>
//           <select id="typeFilter" className="form-select" value={typeFilter} onChange={handleTypeFilter}>
//             <option value="">All</option>
//             <option value="buy">Buy</option>
//             <option value="sell">Sell</option>
//           </select>
//         </div>

//         <table className="table table-hover border">
//           <thead className="table-light">
//             <tr>
//               <th scope="col">Sr No.</th>
//               <th scope="col">Asset Name</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Price (USD)</th>
//               <th scope="col">Time</th>
//               <th scope="col">Transaction Id</th>
//               <th scope="col">Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getPageData().map((data, index) => (
//               <tr key={data.id || index}>
//                 <th scope="row">{calculateSerialNumber(index)}</th>
//                 <td>{data.assetName}</td>
//                 <td>{data.quantity}</td>
//                 <td>{data.rate}</td>
//                 <td>{data.time}</td>
//                 <td>{data._id}</td>
//                 <td>{data.Type}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <Pagination
//           count={Math.ceil(filteredOrderBook.length / rowsPerPage)}
//           page={page}
//           onChange={handleChangePage}
//           style={{ marginTop: "2rem" }}
//         />
//       </div>
//     </>
//   );
// };

// const AnotherComponent = ({ totalBuy, totalSell }) => {
//   // ... AnotherComponent code ...
//   return (
//     <div>
//     <h2>Total Buy: {totalBuy}</h2>
//     <h2>Total Sell: {totalSell}</h2>
//   </div>
//     );
// };

// const ParentComponent = () => {
//   const [totalBuy, setTotalBuy] = useState(0);
//   const [totalSell, setTotalSell] = useState(0);

//   useEffect(() => {
//     // Calculate total buy and sell amounts
//     let totalBuyAmount = 0;
//     let totalSellAmount = 0;

//     // Perform calculations to get total buy and sell values

//     setTotalBuy(totalBuyAmount);
//     setTotalSell(totalSellAmount);
//   }, []);

//   return (
//     <>
//       <OrderBook totalBuy={totalBuy} totalSell={totalSell} />
//       <AnotherComponent totalBuy={totalBuy} totalSell={totalSell} />
//     </>
//   );
// };

// export default ParentComponent;
import React, {useContext} from 'react'
import { TotalContext } from '../MarketComponents/TotalContext'
// import { useLocation } from 'react-router-dom'
const ParentComponent = () => {
    const { totalBuy, totalSell } = useContext(TotalContext);
  return (
    <>
    {/* <div>ParentComponent</div> */}
    <div className="mt-3">
              <div>Total Buy: {totalBuy}</div>
              <div>Total Sell: {totalSell}</div>
            </div>
            
            </>
    
  )
}

export default ParentComponent