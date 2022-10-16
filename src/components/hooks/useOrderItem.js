import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const useOrderItem = () => {
    const {serviceId} = useParams();
    const [service, setService] = useState({});

    useEffect( () =>{
        fetch(`https://agile-forest-60392.herokuapp.com/service/${serviceId}`)
        .then(res=>res.json())
        .then(data=>setService(data))
    }, []);
    

    return [service];
}

export default useOrderItem;