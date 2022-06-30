import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Service.css';
const Service = ({service}) => {
    const {_id, title, price, img} = service;
    const navigate = useNavigate();

    const navigateToServiceDetails = id =>{
        navigate(`/service/${id}`)
    }
    return (
        <div className='service'>
            <img src={img} alt="" />
            <p>Starting Price: ${price}</p>
            <p>{title}</p>
            <Button onClick={() => navigateToServiceDetails(_id)} >{title}</Button>
            

        </div>
    );
};

export default Service;