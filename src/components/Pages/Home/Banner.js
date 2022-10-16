import React, { useEffect, useState } from 'react';
import './Banner.css'
import { Link } from 'react-router-dom';

const Banner = () => {
    const [banner, setBanner] = useState([]);
    const [categoris, setCategoris] = useState([]);

    useEffect(() => {
        const url = `https://agile-forest-60392.herokuapp.com/categoris`
        fetch(url)
            .then(res => res.json())
            .then(data => setCategoris(data));
    }, []);

    useEffect(() => {
        const url = `https://agile-forest-60392.herokuapp.com/banner`
        fetch(url)
            .then(res => res.json())
            .then(data => setBanner(data));
    }, []);

    return (
        <div className='banner py-5'>
            <div className='container d-flex py-5 banner-container'>
                <div className='d-flex align-items-center banner-text'>
                    <div>
                        {
                            banner.map(b => <h1>{b.bannerHeading}</h1>)
                        }
                        {
                            banner.map(b=> <h5>{b.bannerSubHeading}</h5>)
                        }
                        
                        <div className='d-flex justify-content-center'>
                            {
                                categoris.map(category => 
                                    <Link className='btn btn-danger btn-sm' to={`/category/${category.slug}`}><p className='text-white'>{category.categoryName}</p></Link>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className='col-lg-5 banner-img'>
                    {
                        banner.map(b=> <img src={b.bannerImg} alt="" />)
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Banner;