import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Transactions = () => {
    const [user] = useAuthState(auth);
    const [releases, setreleases] = useState([]);
    const [withdraws, setWithdraws] = useState([]);

    let total =0;
    for(const release of setreleases){
        total = total + parseFloat(release.releaseAmount)
    }


    useEffect(() => {
        const url = `https://agile-forest-60392.herokuapp.com/myserviceorder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setreleases(data))
    }, [user]);

    useEffect(() => {
        fetch(`https://agile-forest-60392.herokuapp.com/withdraw?email=${user.email}`)
            .then(res => res.json())
            .then(result => setWithdraws(result))
    }, [user]);

    return (
        <div>
           {total}
           {
            releases.map(release=> <div
            key={release._id}>
                {
                release.releaseStatus === 'released' && <h5>{release.releaseAmount}</h5>}
            </div>
                )
           }
           {
            withdraws.map(withdraw=> 
                <div
                key={withdraw._id}>{withdraw.status === 'accepted' && <h5>{withdraw.amount}</h5>}</div>
                )
           }
        </div>
    );
};

export default Transactions;