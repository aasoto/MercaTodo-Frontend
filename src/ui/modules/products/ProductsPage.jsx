import { useContext, useEffect, useState } from "react"

import { NavLink } from "react-router-dom";
import { CheckIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { AuthContext } from "../../../context"
import { useForm } from "../../../hooks";
import { ENV } from "../../../../env";
import { Generics, Products } from "../../../classes";
import { Container, DangerInfoXL, PageTitle, Paginate, PrimaryInfoXL } from "../../components";
import { DeleteProductConfirmation } from "./DeleteProductConfirmation";

export const ProductsPage = () => {

    const { token } = useContext(AuthContext);
    const { APIUrl, endPoints, parameters } = ENV;
    const { apiVersion, products } = endPoints;
    
    const [alert, setAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [productToDelete, setProductToDelete] = useState('');

    const [response, setResponse] = useState({ loading: true });
    const [pageUrl, setPageUrl] = useState(
        localStorage.getItem('productLastEndpoint')
        ? localStorage.getItem('productLastEndpoint')
        : `${APIUrl}${apiVersion}${products.index}?include=${parameters.products.include}`
    );

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    const {search, price, category, availability, unit, stock, onInputChange} = useForm({
        search: '', 
        price: '',
        category: '',
        availability: '',
        unit: '',
        stock: '',
    });

    useEffect(() => {
        
        const genericRequest = new Generics();

        // Get products categories
        genericRequest.getData(`${APIUrl}${apiVersion}${products.categories.index}`)
            .then(resp => {
                setCategories(resp.data);
            });

        // Get units
        genericRequest.getData(`${APIUrl}${apiVersion}${products.units.index}`, token)
        .then(resp => {
            setUnits(resp.data);
        });
        
    }, []);

    useEffect(() => {
        (new Products()).getData(
            `${pageUrl}&filter[name]=${search}&filter[price]=${price}&filter[products_category_id]=${category}&filter[availability]=${availability}&filter[unit]=${unit}&filter[stock]=${stock}`,
            token,
        ).then( resp => {
            localStorage.setItem('productLastEndpoint', pageUrl);
            setResponse({ loading: false, ...resp });
        });
    }, [pageUrl, search, price, category, availability, unit, stock]);

    return (
        <>
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
                        <>
                            <div className="flex flex-col justify-center items-center gap-5">
                                <div className="w-full sm:w-11/12 bg-white dark:bg-gray-800 rounded-md p-4 shadow-md">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                                                className="border border-gray-500 rounded-md mt-3 px-5 placeholder:italic w-full"
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
                                        <div className="relative rounded-md border border-gray-500 p-1 col-span-1">
                                            <label htmlFor="availability" className="absolute translate-x-7 -translate-y-3 bg-white dark:bg-gray-800 w-min px-3 text-gray-600 text-sm">
                                                Habilitado
                                            </label>
                                            <select
                                                name="availability"
                                                id="availability"
                                                className="border border-gray-500 rounded-md mt-3 px-5 placeholder:italic w-full"
                                                value={availability}
                                                onChange={onInputChange}
                                            >
                                                <option value="">Seleccionar...</option>
                                                <option value="1">Sí</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        <div className="relative rounded-md border border-gray-500 p-1 col-span-1">
                                            <label htmlFor="unit" className="absolute translate-x-7 -translate-y-3 bg-white dark:bg-gray-800 w-min px-3 text-gray-600 text-sm">
                                                Unidades
                                            </label>
                                            <select
                                                name="unit"
                                                id="unit"
                                                className="border border-gray-500 rounded-md mt-3 px-5 placeholder:italic w-full"
                                                value={unit}
                                                onChange={onInputChange}
                                            >
                                                <option value="">Seleccionar...</option>
                                                {   units.length != 0 &&
                                                    units.map(unit => {
                                                        return (
                                                            <option key={unit.id} value={unit.code}>
                                                                {unit.name}
                                                            </option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='col-span-1'>
                                            <input 
                                                type="number" 
                                                name='stock'
                                                className="border border-gray-500 rounded-md px-5 py-3 placeholder:italic w-full"
                                                placeholder="Stock"
                                                value={stock}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-11/12 bg-white rounded-lg px-2 sm:px-5 md:px-10 py-6 shadow-lg flex flex-col justify-center items-center gap-5">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        <NavLink to={'/products/add'}>
                                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md shadow-none hover:shadow-sm scale-100 hover:scale-105 transition duration-200">
                                                Agregar nuevo producto
                                            </button>
                                        </NavLink>
                                    </div>
                                    {
                                        response.data.data.length == 0
                                        ?   <DangerInfoXL>No se encontraron resultados</DangerInfoXL>
                                        :   <>
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
                                                                            <button onClick={() => {setDeleteConfirmation(true); setProductToDelete(product.slug);}} className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 duration-200 transition">
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
                                        </>
                                    }
                                    
                                </div>
                            </div>
                        </>
                }
            </Container>
            {
                deleteConfirmation && 
                <DeleteProductConfirmation 
                    pageUrl={pageUrl}
                    setAlert={setAlert}
                    setDeleteConfirmation={setDeleteConfirmation}
                    setResponse={setResponse}
                    setShowAlert={setShowAlert}
                    slug={productToDelete}
                />
            }
        </>
    );
}
