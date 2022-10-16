import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const useWithdraw = () => {
    const {id} = useParams();
    const [withdraw, setWithdraw] = useState({});

    useEffect( () =>{
        fetch(`https://agile-forest-60392.herokuapp.com/freelancer/${id}`)
        .then(res=>res.json())
        .then(data=>setWithdraw(data))
    }, []);
    

    return [withdraw];
}

export default useWithdraw;