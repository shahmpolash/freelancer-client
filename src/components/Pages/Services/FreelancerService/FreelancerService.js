import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../../../../firebase.init';
import FreelancerSingleService from './FreelancerSingleService';



const FreelancerService = () => {
    const [user] = useAuthState(auth);
    const { serviceId } = useParams();
    const [myservices, setMyservices] = useState([]);
    useEffect( () =>{
        
        fetch(`https://agile-forest-60392.herokuapp.com/service/${serviceId}`)
        .then(res=>res.json())
        .then(data=> setMyservices(data));
       
        

    }, [user])
    return (
        <div>
            <h2>My Services {myservices.length}</h2>
            
           
          
        </div>
    );
};

export default FreelancerService;