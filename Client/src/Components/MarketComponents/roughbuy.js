
  // const[buy, setBuy] = useState({
  //   id: "", name: "", symbol: "", image: "", current_price: "", market_cap: "", market_cap_rank: "", fully_diluted_valuation: "", total_volume: "", high_24h: "", low_24h: "", price_change_24h: "", price_change_percentage_24h: "", market_cap_change_24h: "", market_cap_change_percentage_24h: "", circulating_supply: "", total_supply: "", max_supply: "", ath: "", ath_change_percentage: "", ath_date: "", atl: "", atl_change_percentage: "", atl_date: "", roi: "", last_updated: "", price_change_percentage_1h_in_currency: "", price_change_percentage_24h_in_currency: "", price_change_percentage_7d_in_currency: "", price_change_percentage_14d_in_currency: "", price_change_percentage_30d_in_currency: "", price_change_percentage_200d_in_currency: "", price_change_percentage_1y_in_currency: "", market_cap_change_percentage_1h_in_currency: "", market_cap_change_percentage_24h_in_currency: "", market_cap_change_percentage_7d_in_currency: "", market_cap_change_percentage_14d_in_currency: "", market_cap_change_percentage_30d_in_currency: "", market_cap_change_percentage_200d_in_currency: "", market_cap_change_percentage_1y_in_currency: "", price_change_percentage_1h_in_currency: "", price_change_percentage_24h_in_currency: "", price_change_percentage_7d_in_currency: "", price_change_percentage_14d_in_currency: "", price_change_percentage_30d_in_currency: "", price_change_percentage_200d_in_currency: "", price_change_percentage_1y_in_currency: ""
  // });

  // let name, value;
  // const handleInputs = (e) => {
  //   console.log(e);
  //   name = e.target.name;
  //   value = e.target.value;
  //   console.log(e.target.value,'here is vsalues');
  //   setBuy({...buy, [name]:value});}
  // const PostData = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch("buyOrder", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //     })
  //   });
  //   if (res.status === 422 || !res) {
  //     window.alert("Invalid Registration");
  //     console.log("Invalid Registration");
  //   } else {
  //     window.alert("Registration Successfull");
  //     console.log("Registration Successfull");
  //   }
  // };


  
{/* <p>{data.id}</p>
<p>{data.name}</p>
<p>{data.symbol}</p>
        </div> */}


          // const symbol = data;
//   const symbol = data ? data.symbol : null;
//   const usd = 'busd'
//   const curr = symbol + usd;
//   console.log(curr, 'curr')
//   console.log(symbol, 'symbol')

 // const handleInputs = (e) => {
  //   const { name, value } = e.target;
  //   setBuycoin({ ...Buycoin, [name]: value });
  // };


  const handleInputs = (e) => {
    const { name, value } = e.target;
    setBuycoin((prevBuycoin) => ({
      ...prevBuycoin,
      [name]: value
    }));
    // if (name === 'qty') {
    //   const rate = parseFloat(value) * parseFloat(Buycoin.rate);
    //   setBuycoin((prevBuycoin) => ({
    //     ...prevBuycoin,
    //     rate: rate.toFixed(2)
    //   }));
    // } else if (name === 'rate') {
    //   const qty = parseFloat(value) / parseFloat(Buycoin.rate);
    //   setBuycoin((prevBuycoin) => ({
    //     ...prevBuycoin,
    //     qty: qty.toFixed(2)
    //   }));
    // }
    
  };
 



  <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="qty"
                    name="qty"
                    className="form-control"
                    placeholder="Enter quantity"
                    value={Buycoin.qty}
                    onChange={handleInputs}
                  />
                  <label style={{ paddingTop: 5 }}>Quantity</label>
                </div>

                <div>
                  <input
                    type="text"
                    id="rate"
                    name="rate"
                    className="form-control"
                    placeholder="Enter rate"
                    value={Buycoin.rate}
                    onChange={handleInputs}
                  />
                  <label style={{ paddingTop: 5 }}>Rate</label>
                </div>

                <div>
                  <input
                    type="text"
                    id="token"
                    name="token"
                    className="form-control"
                    placeholder="Enter token"
                    value={Buycoin.token}
                    onChange={handleInputs}
                  />
                  <label style={{ paddingTop: 5 }}>Token</label>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>