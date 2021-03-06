import React from 'react';
import { useNavigate } from 'react-router-dom';
import useWithdraw from '../hooks/useWithdraw';

const WithdrawFunds = () => {
    const [withdraw] = useWithdraw()
    const navigate = useNavigate();

    const handleWithdraw = event =>{
        event.preventDefault();
        const status = event.target.status.value;
        const userId = event.target.userId.value;
        const name = event.target.name.value;
        const email = event.target.email.value;
        const amount = event.target.amount.value;
        const method = event.target.method.value;

        const order = {userId, status, name, email, amount, method };
    
    const url = `http://localhost:5000/withdraw/`;
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(res=>res.json())
    .then(result=> {
        navigate('/dashboard');
    })
};

    return (
        <div>
            <h2>{withdraw.name}</h2>
            <h2>{withdraw.email}</h2>
            <form onSubmit={handleWithdraw}>
                <input hidden value={withdraw._id} type="text" name="userId" id="" />
                <input hidden value={withdraw.name} type="text" name="name" id="" />
                <input type="number" name="amount" id="" placeholder='Amount' />
                <br />
                <input hidden value={withdraw.email} type="text" name="email" id="" />
                <input hidden value='pending' type="text" name="status" id="" />
                <input  type="text" name="method" id="" placeholder='Your PayPal Email'/>
                <br />
                <input type="submit" value="Withdraw Now" />
            </form>
        </div>
    );
};

export default WithdrawFunds;