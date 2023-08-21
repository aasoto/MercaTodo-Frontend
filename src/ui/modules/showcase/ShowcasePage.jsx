import { useEffect, useState } from 'react'
import { Container, DangerInfoXL, PageTitle, Paginate, PrimaryInfoXL } from '../../components'
import { Generics, Showcase } from '../../../classes';
import { ShowcaseProductCard } from './ShowcaseProductCard';
import { ENV } from '../../../../env';
import { useForm } from '../../../hooks';

export const ShowcasePage = () => {

    const { APIUrl, endPoints, parameters } = ENV;
    const { apiVersion, showcase, products } = endPoints;

    const [response, setResponse] = useState({ loading: true });

    const [categories, setCategories] = useState([]);

    const {search, price, category, onInputChange} = useForm({
        search: '', 
        price: '',
        category: '',
    });

    const [pageUrl, setPageUrl] = useState(
        localStorage.getItem('lastEndpoint')
        ? localStorage.getItem('lastEndpoint')
        : `${APIUrl}${apiVersion}${showcase.index}?include=${parameters.showcase.include}`
    );
    
    const showcaseRequest = new Showcase();

    useEffect(() => {
        
        const genericRequest = new Generics();

        // Get products categories
        genericRequest.getData(`${APIUrl}${apiVersion}${products.categories.index}`)
            .then(resp => {
                setCategories(resp.data);
            });
        
    }, []);

    useEffect(() => {
        showcaseRequest.getData(`${pageUrl}&filter[name]=${search}&filter[price]=${price}&filter[products_category_id]=${category}`)
            .then(resp => {
                localStorage.setItem('lastEndpoint', pageUrl);
                setResponse({ loading: false, ...resp });
            });
    }, [pageUrl, search, price, category]);

    return (
        <Container>
            <PageTitle>
                Vitrina de productos
            </PageTitle>
            <hr className="border" />
            {
                response.loading
                    ? <PrimaryInfoXL>Cargando...</PrimaryInfoXL>
                    : <>
                        <div className="w-full bg-white dark:bg-gray-800 rounded-md p-4 shadow-md">
                            <div className="grid grid-cols-4 gap-4">
                                <div className='col-span-2'>
                                    <input 
                                        type="text" 
                                        name='search'
                                        className="border border-gray-500 rounded-md px-7 py-3 placeholder:italic w-full"
                                        placeholder="Buscar"
                                        value={search}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <input 
                                        type="number" 
                                        name='price'
                                        className="border border-gray-500 rounded-md px-5 py-3 placeholder:italic w-full"
                                        placeholder="Precio"
                                        value={price}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div className="relative rounded-md border border-gray-500 p-1 col-span-1">
                                    <label htmlFor="category" className="absolute translate-x-7 -translate-y-3 bg-white dark:bg-gray-800 w-min px-3 text-gray-600 text-sm">
                                        Categoría
                                    </label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                        value={category}
                                        onChange={onInputChange}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {   categories.length != 0 &&
                                            categories.map(category => {
                                                return (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        {
                            response.data.data.length == 0
                            ?   <DangerInfoXL>No se encontraron resultados</DangerInfoXL>
                            :   <div className="flex flex-col justify-center items-center">
                                    <div className="my-5 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                        {response.data.data.map(product => {
                                            return <ShowcaseProductCard key={product.id} {...product} />
                                        })}
                                    </div>
                                    <Paginate 
                                        links={response.data.meta.links} 
                                        setPageUrl={setPageUrl}
                                        setResponse={setResponse}
                                        parameters={`&include=${parameters.showcase.include}`}
                                    />
                                </div>
                        }
                    </>
            }
        </Container>
    );
}
