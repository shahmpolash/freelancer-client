import React from 'react';
import { Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import './Freelancer.css';

const Freelancer = ({freelancer}) => {
    const {_id, name, profile,} = freelancer;
    const navigate = useNavigate();

    const navigateToProfile = id =>{
        navigate(`/freelancer/${id}`)
    }

    return (
        <div className='container'>
            <Button onClick={() => navigateToProfile(_id)}>
                <div className='freelancer'>
                    <img src={profile} alt="" />
                    <p>{name}</p>
                </div>
            </Button>
            
        </div>
    );
};

export default Freelancer;