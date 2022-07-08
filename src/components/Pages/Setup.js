import React from 'react';
import { Link } from 'react-router-dom';
import './Setup.css';

const Setup = () => {
    return (
        <div className='d-flex justify-content-center container setup py-5'>
            <Link className='btn btn-primary mx-5 my-5' to= {'/update'}>Setup As a Provider</Link>
            <Link className='btn btn-primary mx-5 my-5' to= {'/updateclient'}>Setup As a Client</Link>
        </div>
    );
};

export default Setup;