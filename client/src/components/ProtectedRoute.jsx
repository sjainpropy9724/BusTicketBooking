import axios from 'axios';
import React, {useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { message } from 'antd';

function ProtectedRoute({children}) {
    
const [loading,setLoading] = useState(true);
const navigate = useNavigate();
const validateToken = async() => {
      try {
        const response =await axios.post("http://localhost:5000/api/users/get-user-by-id", {} ,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
        if (response.data.success) {
            setLoading(false);
            
        }
        else{
            setLoading(false);
            localStorage.removeItem("token");
            message.error(response.data.message);
            navigate('/login');
        }
      } catch (error) {
            localStorage.removeItem("token");
            message.error(error.message);
            setLoading(false);
            navigate('/login');
      }
}
useEffect(()=>{
    if(localStorage.getItem('token')){
       validateToken();
    } 
    else{
        navigate('/login')
    }
},[])

return <div>{loading ? <div>Loading... </div> : <div>{children}</div> }</div>;


  
}

export default ProtectedRoute;

