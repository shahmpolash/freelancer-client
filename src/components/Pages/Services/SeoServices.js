import useServices from '../../hooks/useServices';
import Service from './Service';
import './Services.css';

const SeoServices = () => {
    const [services] = useServices();

    return (
        <div className='services container'>
            {
                services.map(service => <div key={service._id}>
                    {service.catagory === 'SEO' && <div>
                    {service.publishStatus === 'published'  && <Service
                        key={service._id}
                        service={service}
                    ></Service>}
                    </div>}
                </div>)
            }
        </div>
    );
};

export default SeoServices;