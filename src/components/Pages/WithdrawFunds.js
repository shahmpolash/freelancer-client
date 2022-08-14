import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useWithdraw from '../hooks/useWithdraw';

const WithdrawFunds = () => {
    const [user] = useAuthState(auth);
    const [withdraw] = useWithdraw()
    const navigate = useNavigate();
    const [withdraws, setWithdraws] = useState([]);
    const [myServiceOrders, setMyServiceOrders] = useState([]);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    let total = 0;
    let totalWithdraw = 0;

    for (const w of withdraws) {
        totalWithdraw = totalWithdraw + parseFloat(w.withdrawnAmount);
    }
    for (const balance of myServiceOrders) {
        total = total + parseFloat(balance.releaseAmount - (balance.releaseAmount * 10 / 100));
    };

    total = total - totalWithdraw;

    useEffect(() => {
        const url = `http://localhost:5000/myserviceorder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(info => setMyServiceOrders(info));
    }, [user]);


    useEffect(() => {
        fetch(`http://localhost:5000/withdraw?email=${user.email}`)
            .then(res => res.json())
            .then(withdraw => setWithdraws(withdraw))
    }, [user])

    const handleWithdraw = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const userId = event.target.userId.value;
        const name = event.target.name.value;
        const email = event.target.email.value;
        const amount = event.target.amount.value;
        const withdrawnAmount = event.target.withdrawnAmount.value;
        const method = event.target.method.value;
        const date = event.target.date.value;

        const order = { userId, status, name, email, amount, method, withdrawnAmount, date };

        const url = `http://localhost:5000/withdraw/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');
            })
    };

    return (
        <div className='container'>
            <h2>{withdraw.name}</h2>
            <h2>{withdraw.email}</h2>
            <h5>Your Current Balance: ${total} USD</h5>
            <form onSubmit={handleWithdraw}>
                <input hidden value={date} type="text" name="date" id="" />
                <input hidden value={withdraw._id} type="text" name="userId" id="" />
                <input hidden value={withdraw.name} type="text" name="name" id="" />
                <input type="number" name="amount" id="" placeholder='Amount' max={total} />
                <input hidden value="0" type="number" name="withdrawnAmount" id="" placeholder='withdrawnAmount' />
                <br />
                <input hidden value={withdraw.email} type="text" name="email" id="" />
                <input hidden value='pending' type="text" name="status" id="" />
                <input type="text" name="method" id="" placeholder='Your PayPal Email' />
                <br />
                <input className='btn btn-success' type="submit" value="Withdraw Now" />
            </form>
        </div>
    );
};

export default WithdrawFunds;