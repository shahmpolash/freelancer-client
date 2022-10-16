import React, { useEffect, useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
    const [about, setAbout] = useState([]);

    useEffect(() => {
        const url = `https://agile-forest-60392.herokuapp.com/about`
        fetch(url)
            .then(res => res.json())
            .then(data => setAbout(data));
    }, []);
    return (
        <div>
            {
                about.map(a =>
                    <>
                        <div className='about-us'>
                            <h1 className='text-white'>{a.aboutBannerText}</h1>
                        </div>
                        <div className='container'>
                            <p>
                                {a.aboutContent}
                            </p>
                        </div>
                    </>

                )
            }

        </div>
    );
};

export default AboutUs;