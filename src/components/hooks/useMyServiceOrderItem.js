import  { useEffect, useState } from 'react';




const useMyServiceOrderItem = () => {
    const [serviceOrder, setServiceOrder] = useState({});


    useEffect( () =>{
        const url = `https://agile-forest-60392.herokuapp.com/myserviceorder?provideremail=${serviceOrder.provideremail}`
        fetch(url)
        .then(res=>res.json())
        .then(info=> setServiceOrder(info));

    }, []);
    

    return [serviceOrder];
}

export default useMyServiceOrderItem;