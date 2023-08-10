import { useEffect, useState } from 'react'
import { Container, PageTitle, Paginate, PrimaryInfoXL } from '../../components'
import { Showcase, env } from '../../../classes';
import { ShowcaseProductCard } from './ShowcaseProductCard';

export const ShowcasePage = () => {

    const [response, setResponse] = useState({ loading: true });
    const [pageUrl, setPageUrl] = useState(
        localStorage.getItem('lastEndpoint')
        ? localStorage.getItem('lastEndpoint')
        : `${env.APIUrl}${env.showcaseEndpoints.getData.endPoint}?include=${env.showcaseEndpoints.getData.parameters.include}`
    );

    const showcaseRequest = new Showcase();

    useEffect(() => {
        showcaseRequest.getData(pageUrl)
            .then(resp => {
                localStorage.setItem('lastEndpoint', pageUrl);
                setResponse({ loading: false, ...resp });
            });
    }, [pageUrl]);

    return (
        <Container>
            <PageTitle>
                Vitrina de productos
            </PageTitle>
            <hr className="border" />
            {
                response.loading
                    ? <PrimaryInfoXL>Cargando...</PrimaryInfoXL>
                    :
                    <div className="flex flex-col justify-center items-center">
                        <div className="my-5 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                            {response.data.data.map(product => {
                                return <ShowcaseProductCard key={product.id} {...product} />
                            })}
                        </div>
                        <Paginate 
                            links={response.data.meta.links} 
                            setPageUrl={setPageUrl}
                            setResponse={setResponse}
                            parameters={`&include=${env.showcaseEndpoints.getData.parameters.include}`}
                        />
                    </div>
            }
        </Container>
    );
}
