import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FooterUpdate = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [footer, setFooter] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/footer/${id}`)
            .then(res => res.json())
            .then(data => setFooter(data))
    }, [footer])


    const handleFooterUpdate = event => {
        event.preventDefault();
        const footerLogo = event.target.footerLogo.value;
        const footerText = event.target.footerText.value;
        const footerEmail = event.target.footerEmail.value;
        const footerAddress = event.target.footerAddress.value;
        const footerUpdate = { footerLogo, footerText, footerEmail, footerAddress }
        const url = `http://localhost:5000/footer/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(footerUpdate)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/page-settings');

            })
    }
    return (
        <div className='container my-5'>
            <form onSubmit={handleFooterUpdate}>
                    <input defaultValue={footer.footerLogo} type="text" name="footerLogo" id="" placeholder='Banner Text' />
                    <textarea defaultValue={footer.footerText} type="text" name="footerText" id="" placeholder='Text' />
                    <input defaultValue={footer.footerEmail} type="email" name="footerEmail" id="" placeholder='Contact Email' />
                    <input defaultValue={footer.footerAddress} type="text" name="footerAddress" id="" placeholder='Contact Address' />
                    <input type="submit" value="Update Now" />
                </form>
            
        </div>
    );
};

export default FooterUpdate;