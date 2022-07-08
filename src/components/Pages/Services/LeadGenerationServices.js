import useServices from '../../hooks/useServices';
import Service from './Service';
import './Services.css';

const LeadGenerationServices = () => {
    const [services] = useServices();

    return (
        <div className='services container'>
            {
                services.map(service => <div key={service._id}>
                    {service.publishStatus === 'published' && <div>
                    {service.catagory === 'Lead'  && <Service
                        key={service._id}
                        service={service}
                    ></Service>}
                    </div>}
                </div>)
            }
        </div>
    );
};

export default LeadGenerationServices;