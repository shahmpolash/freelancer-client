import { useEffect, useState } from "react";

const useServices = () =>{
    const [services, setServices] = useState([]);

    useEffect( ()=>{
        fetch('https://agile-forest-60392.herokuapp.com/service')
        .then(res=>res.json())
        .then(data=>setServices(data))
    }, []);
    return [services]
}

export default useServices;