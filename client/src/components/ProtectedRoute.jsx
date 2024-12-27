import axios from 'axios';
import React, {useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';

function ProtectedRoute() {
    
const [loding,setLoading] = useState(true);
const navigate = useNavigate();
const validateToken = () => {
      try {
        const response = axios.post('/api/users/get-users-by-id', {} ,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status) {
            setLoading(false);
            
        }
        else{
            setLoading(false);
            navigate('/login');
        }
      } catch (error) {
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

  return 
    <div>
      {loding ? <div>Loading... </div> : <div>{Children}</div> }
    </div>;
  
}

export default ProtectedRoute;