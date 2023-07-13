import { BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import React from 'react';
// import Navbar from "./Components/navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import Home from "./Components/pages/Home";
import About from "./Components/pages/About";
import Contact from "./Components/pages/Contact";
import Featured from './Components/pages/Featured';
// import News from './Components/pages/News';
import Faqs from './Components/pages/Faqs';
import Market from "./Components/pages/Market";
import Footer from './Components/Footer/Footer';
// import Login from './Components/pages/Login';
import Dashboard from './Components/pages/Dashboard';
import SignIn from './Components/pages/SignIn';
import SignUp from './Components/pages/SignUp';
import ForgotPassword from './Components/pages/ForgotPassword';
import Trending from './Components/pages/Trending';
// import Crypto from './Components/MarketComponents/Crypto';
// import CryptoDetails from './Components/MarketComponents/CryptoDetails';
import Portfolio from './Components/pages/Portfolio';
import OrderBook from './Components/pages/OrderBook';
// import NavbarC from './Components/navbar/NavbarComponent'
import Saved from './Components/MarketComponents//Saved';
import NavbarWrapper from '../src/Components/pages/NavbarWrapper';
import CoinsInfo from '../src/Components/MarketComponents/CoinsInfo';
import Buy from './Components/MarketComponents/Buy';
import FinalCoinsInfo from './Components/MarketComponents/FinalCoinsInfo';
import Sell from './Components/MarketComponents/Sell';
import  Erros  from './Components/pages/Erros';
import CheckStatus from './Components/pages/CheckStatus';
import SignOut from './Components/pages/SignOut';
import Analysis from './Components/pages/Analysis';
function App() {
  // const location = useLocation();
  // const hideNavbarOnDashboard = location.pathname === '/dashboard';

  //   const location = useLocation();
  //   const id = location.pathname.split('/:id')[1];
  // // let {id} = useParams();
  // console.log(id, 'dsfds')
  

  return (
    // <div className="App">
      <BrowserRouter>
      {/* <NavbarC/> */}
      {/* <Navbar/> */}
      <NavbarWrapper />

      <AppRoutes />
      </BrowserRouter>
    // </div>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  // const { id } = useParams();
  const id = location.pathname.split(':id');
  console.log(id, 'sfdgdgd'); // Display the id in the console

  return (
   <>
   {!id?<NavbarWrapper/>:""}
      
      {/* {hideNavbarOnDashboard ? null : <Navbar />} */}
      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/Featured' element={<Featured/>} />
        {/* <Route path='/News' element={<News/>} /> */}
        <Route path='/About' element={<About/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Faqs' element={<Faqs/>} />
        <Route path='/Market' element={<Market/>} >
          {/* <Route path="/" element={<CryptoDetails />} /> */}
        {/* <Route path=":id" element={<CryptoDetails />} /> */}
        {/* <Route path=":id" element={<FinalCoinsInfo  id={id}/>} /> // portal */} 
          </Route>

          
          <Route path="/Dashboard/:id" element={<CoinsInfo id={id} />} />
          <Route path="/:id/buy" element={<Buy/>}  />
          <Route path="/:id/sell" element={<Sell/>}  />    
          {/* <Route path="/:id" element={<CoinsInfo />} >
          <Route path="/:id/buy" element={<Buy/>}  /> 
            </Route> */}
          
          <Route path="/:id" element={<FinalCoinsInfo id={id} />} />

        
        <Route path='/Footer' element={<Footer/>} />
        
        {/* <Route path='/Login' element={<Login/>} /> */}
        <Route path='*' element={<h1>404 Not Found</h1>} />
        <Route path='/SignIn' element={<SignIn/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/SignOut' element={<SignOut/>} />
        <Route path='/ForgotPassword' element={<ForgotPassword/>} />
        <Route path='/Dashboard'  Component={Dashboard} element={<Dashboard/>} />
        <Route path='/Trending' element={<Trending/>} />
        {/* <Route path='/Crypto' element={<h1>Crypto</h1>} />   */}
        {/* <Route path='/Market/:id' element={<h1>CryptoDetails</h1>} /> */}
        <Route path='/Portfolio' element={<Portfolio/>} />
        <Route path='/OrderBook' element={<OrderBook/>} />
        <Route path='/Saved' element={<Saved/>} />
        <Route path='/Analysis' element={<Analysis/>} />
        {/* <Route path='/CoinsInfo' element={<CoinsInfo/>} /> */}
        <Route path='*' element={<Erros/>}/>
        <Route path='/CheckStatus' element={<CheckStatus/>} />
      </Routes>
      </>
  );
}


export default App;

