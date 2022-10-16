import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentUpdate = () => {
    const { id } = useParams();
    const [paymentUpdate, setPaymentUpdate] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`https://agile-forest-60392.herokuapp.com/payment-setting/${id}`)
            .then(res => res.json())
            .then(data => setPaymentUpdate(data))
    }, [paymentUpdate])


    const updatePaymentSetting = event => {
        event.preventDefault();
        const paypalEmail = event.target.paypalEmail.value;
        const commission = event.target.commission.value;
        const paymentSettingUpdate = { paypalEmail, commission }
        const url = `https://agile-forest-60392.herokuapp.com/payment-setting/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(paymentSettingUpdate)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/settings');

            })
    }
    return (
        <div className='container'>
            <form onSubmit={updatePaymentSetting}>
                <input defaultValue={paymentUpdate.paypalEmail} type="email" name="paypalEmail" id="" placeholder='PayPal Email' />
                <input defaultValue={paymentUpdate.commission} type="number" name="commission" id="" placeholder='Commission Percentage' />
                <input type="submit" value="Update Now" />
            </form>
        </div>
    );
};

export default PaymentUpdate;