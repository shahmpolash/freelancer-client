import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './LogoSetting.css';

const LogoSetting = () => {
    const navigate = useNavigate();
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/logo`
        fetch(url)
            .then(res => res.json())
            .then(data => setLogo(data));
    }, []);


    const handleLogo = event => {
        event.preventDefault();
        const logoImg = event.target.logoImg.value;
        const logo = { logoImg }
        const url = `http://localhost:5000/logo`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(logo)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/settings');

            })
    }
    return (
        <div className='container logosetting mt-5'>
            {
                logo.length === 1 &&
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Logo Image</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        logo.map(l =>
                            <tr>
                                <td><img src={l.logoImg} alt="" /></td>
                                <td><Link to={`/admin/setting/logo/${l._id}`}>Update Logo</Link></td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
            }
            
            {
                logo.length === 0 &&

                <form onSubmit={handleLogo}>
                    <input type="text" name="logoImg" id="" placeholder='Logo URL' />
                    <input type="submit" value="Upload Logo" />
                </form>
            }

        </div>
    );
};

export default LogoSetting;