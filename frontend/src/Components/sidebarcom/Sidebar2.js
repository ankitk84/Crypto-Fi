import { useEffect, useState } from "react";
// import Trending from "../pages/Trending";
import About from "../pages/About";
// import Featured from "../pages/Featured";
// import Portfolio from "../pages/Portfolio";
// import News from "../pages/News";
import "./Sidebar2.css";

import 'boxicons/css/boxicons.min.css';
import logo from '../../Components/Assets/logo.png'
import Market from "../pages/Market";
import { BsFillFileEarmarkTextFill,BsShop } from "react-icons/bs";
import Analysis from "../pages/Analysis";
import OrderBook from "../pages/OrderBook";
import Contact from "../pages/Contact";
// import "./styles.css";


export function Sidebar2() {
  const [toggleState, setToggleState] = useState(1);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleWithSidebar = () => setIsSidebarActive(!isSidebarActive);

  useEffect(() => {
    setIsSidebarActive(false);
  }, [toggleState]);

  return (
    <div style={{display:"flex",justifyContent:"center"}}>
    <div className={isSidebarActive === true ? "nav show-menu" : "nav"} style={{}}  >
      <nav className="nav__content">
        <div
          className={
            isSidebarActive === true ? "nav__toggle rotate-icon" : "nav__toggle"
          }
          onClick={handleWithSidebar}
        //   style={{paddingLeft:6}}
        >
          <i className="bx bx-chevron-right"></i>
        </div>

        <button href="/#" className="nav__logo">
          {/* <i className="bx bxs-ghost"></i> */}
          
          <img  src={logo} alt="icon" style={{width:30, paddingLeft:0, marginLeft:0}} />
         
          <span className="nav__logo-name">CRYPTO FI</span>
        </button>

        <div className="nav__list">
          <button
            href="#"
            className={
              toggleState === 1 ? "nav__link active-link" : "nav__link"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="bx ">
            <BsShop style={{height:30}} />
            </i>
            
            <span className="nav__name">Dashboard</span>
          </button>

          <button
            href="#"
            className={
              toggleState === 2 ? "nav__link active-link" : "nav__link"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="bx bx-file"></i>
            <span className="nav__name">Portfolio</span>
          </button>

          <button
            href="#"
            className={
              toggleState === 3 ? "nav__link active-link" : "nav__link"
            }
            onClick={() => toggleTab(3)}
          >
            {/* <i className="bx bx-envelope"></i> */}
            <div style={{paddingLeft:10}}>
            <BsFillFileEarmarkTextFill style={{height:30}} />
            </div>
            <span className="nav__name">Analysis</span>
          </button>

          <button
            href="#"
            className={
              toggleState === 4 ? "nav__link active-link" : "nav__link"
            }
            onClick={() => toggleTab(4)}
          >
            <i className="bx bx-bar-chart-square"></i>
            <span className="nav__name">OrderBook</span>
          </button>
{/* 
            <button className={
              toggleState === 5 ? "nav__link active-link" : "nav__link"
            }
            onClick={() => toggleTab(5)}>
                 <i className="bx bx-cog"></i>
            <span className="nav__name">About</span>
                

            </button> */}
          <button
            href="#"
            className={
              toggleState === 5 ? "nav__link active-link" : "nav__link"
            }
            onClick={() => toggleTab(6)}
          >
            <i className="bx bx-cog"></i>
            <span className="nav__name">Contact Us</span>
          </button>
        </div>
      </nav>

      
    </div>
    <div className="page-content">
        {toggleState === 1 && <Market/>}
        {toggleState === 2 && <About/>}
        {toggleState === 3 && <Analysis/>}
        {toggleState === 4 && <OrderBook />}
        {/* {toggleState === 5 && <About />} */}
        {toggleState === 6 && <Contact />}
        {/* {toggleState === 7 && <CoinsInfo />} */}
      </div>

    </div>
   

    
  );
}
