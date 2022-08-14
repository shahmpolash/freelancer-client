import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [footers, setFooters] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/footer`
        fetch(url)
            .then(res => res.json())
            .then(data => setFooters(data));
    }, []);
    return (
        <div className='footer'>
            {
                footers.map(f =>
                    <>
                        <h2 className='text-white'>{f.footerLogo}</h2>
                        <div className='d-flex justify-content-center container'>
                            <div className=' col-lg-4'>
                                <p className='text-white'>{f.footerText}</p>
                                <p className='text-white'><i class="fa-solid fa-at"></i> {f.footerEmail}</p>
                            </div>
                            <div className='col-lg-4'>
                                <li className='text-white'>Home</li>
                                <li className='text-white'><Link to={'/about'}>About</Link></li>
                                <li className='text-white'>Link</li>
                                <li className='text-white'>Provider</li>
                                <li className='text-white'><Link to={'/contact'}>Contact Us</Link></li>
                            </div>
                            <div className='d-flex col-lg-4'>
                                <input type="text" name="" id="" />
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    );
};

export default Footer;