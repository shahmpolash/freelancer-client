import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <h2 className='text-white'>Freelancer</h2>
            <div className='d-flex justify-content-center container'>
                <div className=' col-lg-4'><p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem velit quasi reprehenderit non nam ratione sunt doloribus. Placeat, nulla.</p></div>
                <div className='col-lg-4'>
                    <li className='text-white'>Home</li>
                    <li className='text-white'>About</li>
                    <li className='text-white'>Link</li>
                    <li className='text-white'>Provider</li>
                    <li className='text-white'>Client</li>
                </div>
                <div className='d-flex col-lg-4'>
                    <input type="text" name="" id="" />
                    <input type="submit" value="Submit" />
                </div>
            </div>
        </div>
    );
};

export default Footer;