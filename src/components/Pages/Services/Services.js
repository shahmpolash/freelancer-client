import useServices from '../../hooks/useServices';
import Service from './Service';
import './Services.css';

const Services = () => {
    const [services] = useServices();

    return (
        <div className='services container mt-5'>

            {
                services.map(service => <>
                    {service.publishStatus === 'Published' && <Service
                        key={service._id}
                        service={service}
                    ></Service>}

</> )
            }
        </div>
    );
};

export default Services;