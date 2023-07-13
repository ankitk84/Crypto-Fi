import React , {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';

const CheckStatus = () => {

    const [checkStatus, setCheckStatus] = useState(false);
    const CallCheckStatus = async () => {
        try {
            const res = await fetch("http://localhost:8000/checkstatus", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });
            // console.log(res,'checkStatus res')
            const data = await res.json();
            console.log(data,'checkStatus data');
            setCheckStatus(data);
            if (res.status === 401) {
             setCheckStatus(false);
                return;
              }
            console.log(setCheckStatus,'fdf')

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        }catch (err) {
            console.log(err)
            // navigate('/Signin');
        }
    }

    useEffect(() => {
        CallCheckStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[]);
    const handleLogout = () => {
        setCheckStatus(false); // Set checkStatus to false when logout is clicked
        // Perform logout actions here
      };

  return (
    <>
    {/* <div>CheckStatus</div> */}
    {/* <div>{checkStatus.toString()}</div> */}
    {/* {
        checkStatus ? <div>True</div> : <div>False</div>
    } */}
    {
        checkStatus ? 
      <div className="nav-item me-5">
        <NavLink className="nav-link" to="/SignOut" 
        onClick={handleLogout}>Logout</NavLink>
      </div>
      : <>
       <div className="nav-item me-2 mb-2 mb-lg-0">
       <NavLink className="nav-link" to="/SignIn">Login</NavLink>
     </div> 
      <div className="nav-item me-5">
       <NavLink className="nav-link" to="SignUp">Register</NavLink>
     </div>
        </>
    }

    </>
  )
}

export default CheckStatus