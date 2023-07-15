import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import CheckStatus from './CheckStatus';

const SignOut = () => {

    const navigate = useNavigate();
    // const [loggetout, setLoggetout] = useState(false);
    // const loggetout=false;

    // const callSignOut = async () => {
    //     try {
    //         const res = await fetch("http://localhost:8000/logout", {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             credentials:"include"
    //         });
    //         // console.log(res,'checkStatus res')
    //         if (!res.status === 200) {
    //             const error = new Error(res.error);
    //             throw error;
    //         }
    //     }catch (err) {
    //         console.log(err)
    //         navigate('/SignIn');
    //     }
    // }
    // // callSignOut();
    // useEffect(() => {
    //     callSignOut();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[]);
    useEffect(() => {
        fetch("https://crypto-fi.onrender.com/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials:"include"
        }).then((res) => {
            if(res.status === 200){
                navigate('/SignIn');
                // setLoggetout(false);
            }
        }).catch((err) => {
            console.log(err);
            // setLoggetout(true);
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


  return (
   <>
    
   
    {/* <CheckStatus loggetout={loggetout} /> */}
   </>

  )
}

export default SignOut