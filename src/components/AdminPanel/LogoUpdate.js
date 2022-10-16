import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LogoUpdate = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        const url = `https://agile-forest-60392.herokuapp.com/logo/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setLogo(data));
    }, [logo]);

    const handleLogo = event => {
        event.preventDefault();
        const logoImg = event.target.logoImg.value;
        const logo = { logoImg }
        const url = `https://agile-forest-60392.herokuapp.com/logo/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(logo)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/setting/logo');

            })
    }
    return (
        <div className='container mt-5'>

            <form onSubmit={handleLogo}>
                    <input defaultValue={logo.logoImg} type="text" name="logoImg" id="" placeholder='Logo URL' />
                    <input type="submit" value="Update Logo" />
                </form>
        </div>
    );
};

export default LogoUpdate;