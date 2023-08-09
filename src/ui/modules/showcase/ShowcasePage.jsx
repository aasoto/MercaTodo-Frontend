import { useEffect, useState } from 'react'
import { Container, PageTitle, PrimaryInfoXL } from '../../components'
import { Showcase } from '../../../classes';
import { ShowcaseProductCard } from './ShowcaseProductCard';

export const ShowcasePage = () => {

    const [response, setResponse] = useState({ loading: true });

    const showcaseRequest = new Showcase();

    useEffect(() => {
        showcaseRequest.getDataWithParameters()
            .then(resp => {
                setResponse({ loading: false, ...resp });
            });
    }, []);

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
                    <div className="my-5 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {response.data.data.map(product => {
                            return <ShowcaseProductCard key={product.id} {...product} />
                        })}
                    </div>
            }
        </Container>
    );
}
