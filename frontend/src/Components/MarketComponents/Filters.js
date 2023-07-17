import React, {useContext,useRef} from 'react'
import { CryptoContext } from './CryptoContext';
const Filters = () => {
    let { setCurrency, setSortBy } = useContext(CryptoContext);
  const currencyRef = useRef(null);
  

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  

  return (
    <>   
    
    <div style={{maxWidth:650, marginLeft:"auto",zIndex:-1,  textAlign:"center"}}>
      <div className=' mt-5 mx-5 py-3' style={{ color:"black",flexWrap:"wrap", display:"flex", minWidth:"maxContent"}}>
        <form
          className="relative flex items-center font-nunito
          
          "
          onSubmit={handleCurrencySubmit}
        >
          <label
            htmlFor="currency"
            className="relative flex justify-center items-center
          mr-2 font-bold
          "
          >
            currency:{" "}
          </label>
          <input
            type="text"
            name="currency"
            ref={currencyRef}
            placeholder="usd"
            className="mx-2 mt-2  bg-gray-200 
     pl-2 required outline-0 border border-1 
      leading-4
     "
          />
          {/* <button type="submit" className="ml-1 cursor-pointer">
            <img src='#' alt="submit" className="w-full h-auto" />
          </button> */}
        </form>

        <label className="relative flex justify-center items-center"  >
          <span className=" mr-2">Sort by: </span>
            <select
              name="sortby"
              className="mx-2 text-base mt-2  p-0.5  border border-1 leading-4 capitalize "    
             
              onClick={handleSort}

            >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gecko asc</option>
          </select>
          {/* <img
            src="#"
            alt="submit"
            className="w-[1rem] h-auto
absolute right-1 top-2 pointer-events-none
"
          /> */}
        </label>
      </div>
      </div>
    </>
  )
}

export default Filters