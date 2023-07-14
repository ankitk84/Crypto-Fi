
// import { NavLink } from 'react-router-dom'
// import logo from '../Assets/logo.png'


// import './navbar.css'


// const Navbar = () => {
//   // const [showNavbar, setShowNavbar] = useState(false)

//   // const handleShowNavbar = () => {
//   //   setShowNavbar(!showNavbar)
//   // }

//   return (
//     <>
 
       
//       <div className='col-10 mx-auto nav_bg-light'>
//         <nav className="navbar navbar-expand-lg navbar-light ">
//           <div className="container-fluid">
//             <NavLink className="navbar-brand" to="/">
//               <span className='d-flex ' style={{alignItems:"center"}}>
//               <img src={logo} alt='logo' style={{ width: 55, height: 55 }} />
//               CRYPTO FI
//               </span></NavLink>
             
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon "></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <NavLink className="nav-link active" aria-current="page" to="/Featured">Featured</NavLink>
//                 </li>
//                 <li className="nav-item dropdown">
//                   <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Market
//                   </NavLink>
//                   <ul className="dropdown-menu">
//                     <li><NavLink className="dropdown-item" to="/Market">Market</NavLink></li>
//                     <li><NavLink className="dropdown-item" to="/Trending">Trending</NavLink></li>

//                   </ul>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/News">News</NavLink>
//                 </li>
//                 <li className="nav-item dropdown">
//                   <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     About
//                   </NavLink>
//                   <ul className="dropdown-menu">
//                     <li><NavLink className="dropdown-item" to="/About">About</NavLink></li>
//                     <li><NavLink className="dropdown-item" to="/Contact">Contact</NavLink></li>
//                     <li><hr className="dropdown-divider" /></li>
//                     <li><NavLink className="dropdown-item" to="/Portfolio">Portfolio</NavLink></li>
//                     <li><NavLink className="dropdown-item" to="/OrderBook">OrderBook</NavLink></li>
//                   </ul>
//                 </li>
//                 {/* <li className="nav-item">
//           <NavLink className="nav-link disabled">Disabled</NavLink>
//         </li> */}
//               </ul>

//               <div className="nav-item me-2 mb-2 mb-lg-0">
//                 <NavLink className="nav-link" to="/SignIn">Login</NavLink>
//               </div>
//               <div className="nav-item me-5">
//                 <NavLink className="nav-link" to="SignUp">Register</NavLink>
//               </div>
//               {/* <div className="nav-item me-5">
//           <NavLink className="nav-link" to="3">logout</NavLink>
//         </div> */}
//               {/* <form className="d-flex" role="search">
//         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//         <button className="btn btn-outline-success" type="submit">Search</button>
//       </form> */}
//             </div>
//           </div>
//         </nav>
//       </div>

// </>
//   );
// }

// export default Navbar


import { NavLink } from 'react-router-dom';
import logo from '../Assets/logo.png';
import './navbar.css';
import CheckStatus from '../pages/CheckStatus';

const Navbar = () => {
  return (
    <>
      <div className='col-10 mx-auto ' style={{ marginLeft:"auto", marginRight:"auto"}} >
        <nav className="navbar navbar-expand-lg  " style={{}}>
          <div className="container-fluid " style={{backgroundColor:'none'}}>
            <NavLink className="navbar-brand" to="/">
              <span className='d-flex ' style={{alignItems:"center"}}>
                <img src={logo} alt='logo' style={{ width: 55, height: 55 }} />
                CRYPTO FI
              </span>
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/Featured">
                    Featured
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Market
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/Market">Market</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/Trending">Trending</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/Saved">Saved</NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/About">News</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    About
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/About">About</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/Contact">Contact</NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/Portfolio">Portfolio</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/OrderBook">OrderBook</NavLink>
                    </li>
                  </ul>
                </li>
              </ul>

                <CheckStatus/>

              {/* <div className="nav-item me-2 mb-2 mb-lg-0">
                <NavLink className="nav-link" to="/SignIn">Login</NavLink>
              </div> 
               <div className="nav-item me-5">
                <NavLink className="nav-link" to="SignUp">Register</NavLink>
              </div>
              <div className="nav-item me-5">
                <NavLink className="nav-link" to="Logout">Logout</NavLink>
              </div> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
