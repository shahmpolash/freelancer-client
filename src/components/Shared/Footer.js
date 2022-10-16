import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [footers, setFooters] = useState([]);
    const [categoris, setCategoris] = useState([]);

    useEffect(() => {
        const url = `https://agile-forest-60392.herokuapp.com/categoris`
        fetch(url)
            .then(res => res.json())
            .then(data => setCategoris(data));
    }, []);

    useEffect(() => {
        const url = `https://agile-forest-60392.herokuapp.com/footer`
        fetch(url)
            .then(res => res.json())
            .then(data => setFooters(data));
    }, []);
    return (
        <div className='footer'>
            {
                footers.map(f =>
                    <>
                        <img className='footer-logo' src={f.footerLogo} alt="" />
                        <div className='d-flex justify-content-between container footer-container'>
                            <div className=' col-lg-4'>
                                <p className='text-white'>{f.footerText}</p>
                                <p className='text-white'><i class="fa-solid fa-at"></i> {f.footerEmail}</p>
                            </div>
                            <div className='col-lg-4 menu-list'>
                                <li><Link className='text-white text-left' to={'/'}>Home</Link></li>
                                <li><Link className='text-white text-left' to={'/about'}>About</Link></li>
                                <li><Link className='text-white text-left' to={'/contact'}>Contact Us</Link></li>
                                {
                                    categoris.map(category => 
                                        <li><Link className='text-white text-left' to={`/category/${category.slug}`}>{category.categoryName}</Link></li>
                                        )
                                }
                               
                            </div>
                            <div className='d-flex justify-content-center col-lg-4 social-icons'>
                                <a href={f.facebookURL}><i class="fa-brands fa-facebook"></i></a>
                                <a href={f.twitterURL}><i class="fa-brands fa-twitter"></i></a>
                                <a href={f.youtubeURL}><i class="fa-brands fa-youtube"></i></a>
                                <a href={f.liniedInURL}><i class="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                        <p className='text-white mt-5'>{f.copyRight}</p>
                    </>
                )
            }

        </div>
    );
};

export default Footer;