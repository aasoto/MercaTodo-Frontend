import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context"
import { Products } from "../../../classes";
import { ENV } from "../../../../env";
import { Container, PageTitle, Paginate, PrimaryInfoXL } from "../../components";
import { CheckIcon, EyeIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink, Navigate } from "react-router-dom";

export const ProductsPage = () => {

    const { token } = useContext(AuthContext);
    const { APIUrl, endPoints, parameters } = ENV;
    const { apiVersion, products } = endPoints;
    
    const [alert, setAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [response, setResponse] = useState({ loading: true });
    const [pageUrl, setPageUrl] = useState(
        localStorage.getItem('productLastEndpoint')
        ? localStorage.getItem('productLastEndpoint')
        : `${APIUrl}${apiVersion}${products.index}?include=${parameters.products.include}`
    );

    useEffect(() => {
        (new Products()).getData(
            pageUrl,
            token,
        ).then( resp => {
            localStorage.setItem('productLastEndpoint', pageUrl);
            setResponse({ loading: false, ...resp });
        });
    }, [pageUrl]);

    const onDeleteProduct = (slug) => {
        (new Products()).delete(slug, token)
            .then(resp => {
                switch (resp.statusText) {
                    case 'OK':
                        setAlert(true);
                        setShowAlert(true);
                        (new Products()).getData(
                            pageUrl,
                            token,
                        ).then( resp => {
                            localStorage.setItem('productLastEndpoint', pageUrl);
                            setResponse({ loading: false, ...resp });
                        });
                        setTimeout(() => {
                            setShowAlert(false);
                        }, 5000);
                        break;
                }
            });
    }

    return (
        <Container>
            {
                alert &&
                <div className={`fixed bottom-4 right-4 animate__animated ${ showAlert ? "animate__fadeInRight" : "animate__fadeOutRight" } bg-red-600/60 text-white font-semibold rounded-md px-5 py-3`}>
                    Registro eliminado correctamente
                </div>
            }
            <PageTitle>
                Módulo de gestión de productos
            </PageTitle>
            <hr className="border mb-5" />
            {
                response.loading
                    ? <PrimaryInfoXL>Cargando...</PrimaryInfoXL>
                    : 
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="w-full sm:w-11/12 bg-white rounded-lg px-2 sm:px-5 md:px-10 py-6 shadow-lg flex flex-col justify-center items-center gap-5">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <NavLink to={'/products/add'}>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md shadow-none hover:shadow-sm scale-100 hover:scale-105 transition duration-200">
                                        Agregar nuevo producto
                                    </button>
                                </NavLink>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-300 rounded-tl-2xl font-bold px-2 py-5">
                                            ID
                                        </th>
                                        <th className="bg-gray-300 font-bold px-2 py-5">
                                            Nombre
                                        </th>
                                        <th className="hidden md:block bg-gray-300 font-bold px-2 py-5">
                                            Categoría
                                        </th>
                                        <th className="bg-gray-300 font-bold px-2 py-5">
                                            Precio
                                        </th>
                                        <th className="bg-gray-300 font-bold px-2 py-5">
                                            Unidad
                                        </th>
                                        <th className="hidden md:block bg-gray-300 font-bold px-2 py-5">
                                            Disponibilidad
                                        </th>
                                        <th className="bg-gray-300 rounded-tr-2xl font-bold px-2 py-5">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        response.data.data.map(product => {
                                            return (
                                                <tr key={product.id} className="border-b border-gray-400">
                                                    <td className="font-bold pl-4 py-2 text-center">
                                                        { product.id }
                                                    </td>
                                                    <td className="capitalize pl-4 py-2">
                                                        { product.name }
                                                    </td>
                                                    <td className="hidden md:block capitalize pl-4 py-2">
                                                        { product.product_category.name }
                                                    </td>
                                                    <td className="pl-4 py-2 text-right">
                                                        { product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) }
                                                    </td>
                                                    <td className="capitalize pl-4 py-2">
                                                        { product.product_unit.name }
                                                    </td>
                                                    <td className="hidden md:block">
                                                        { 
                                                            product.availability
                                                            ?   <div className="flex justify-center items-center">
                                                                    <CheckIcon className="text-green-600 w-10 h-10"/> 
                                                                </div> 
                                                            :   <div className="flex justify-center items-center">
                                                                    <XMarkIcon  className="text-red-600 w-10 h-10"/> 
                                                                </div>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-2 md:my-0">
                                                            <NavLink to={`/products/edit/${product.slug}`}>
                                                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-md px-4 py-2 duration-200 transition">
                                                                    <PencilSquareIcon className="w-4 h-4"/>
                                                                </button>
                                                            </NavLink>
                                                            <button onClick={() => onDeleteProduct(product.slug)} className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 duration-200 transition">
                                                                <TrashIcon className="w-4 h-4"/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                            <Paginate 
                                links={response.data.meta.links} 
                                setPageUrl={setPageUrl}
                                setResponse={setResponse}
                                parameters={`&include=${parameters.products.include}`}
                            />
                        </div>
                    </div>
            }
        </Container>
    )
}
