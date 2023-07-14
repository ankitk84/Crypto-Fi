// import React, { createContext, useState } from 'react';

// export const TotalContext = createContext();

// export const TotalProvider = ({ children }) => {
//   const [totalBuy, setTotalBuy] = useState(0);
//   const [totalSell, setTotalSell] = useState(0);

//   const setTotalValues = (buy, sell) => {
//     setTotalBuy(buy);
//     setTotalSell(sell);
//   };

//   const contextValue = {
//     totalBuy,
//     totalSell,
//     setTotalValues
//   };

//   return (
//     <TotalContext.Provider value={{contextValue, setTotalValues}}>
//       {children}
//     </TotalContext.Provider>
//   );
// };
import React, { createContext, useState } from 'react';

export const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const [totalBuy, setTotalBuy] = useState(0);
  const [totalSell, setTotalSell] = useState(0);
   
  const setTotalValues = (buy, sell) => {
    setTotalBuy(buy);
    setTotalSell(sell);
  };

  const contextValue = {
    totalBuy,
    totalSell,
    setTotalValues
  };

  return (
    <TotalContext.Provider value={contextValue}>
      {children}
    </TotalContext.Provider>
  );
};
