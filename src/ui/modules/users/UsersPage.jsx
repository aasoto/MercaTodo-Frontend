import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context";
import { ENV } from "../../../../env";
import { Generics, Users } from "../../../classes";
import { Container, DangerInfoXL, PageTitle, Paginate, PrimaryInfoXL } from "../../components";
import { NavLink } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "../../../hooks";

export const UsersPage = () => {
    
    const { token } = useContext(AuthContext);
    const { APIUrl, endPoints, parameters } = ENV;
    const { apiVersion, users } = endPoints;

    const [response, setResponse] = useState({ loading: true });
    const [pageUrl, setPageUrl] = useState(
        localStorage.getItem('usersLastEndpoint')
        ? localStorage.getItem('usersLastEndpoint')
        : `${APIUrl}${apiVersion}${users.index}?include=${parameters.users.include}`
    );

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);

    const { number_document, name, email, state_id, city_id, enabled, onInputChange } = useForm({
        number_document: '',
        name: '',
        email: '',
        state_id: '',
        city_id: '',
        enabled: '',
    });

    useEffect(() => {
        const genericRequest = new Generics();

        // Get states
        genericRequest.getData(`${APIUrl}${apiVersion}${users.states.index}`)
            .then(resp => {
                setStates(resp.data);
            });

        // Get cities
        genericRequest.getData(`${APIUrl}${apiVersion}${users.cities.index}`)
            .then(resp => {
                setCities(resp.data);
            });
    }, []);

    useEffect(() => {
        
        onInputChange({
            target: {
                name: 'city_id',
                value: '',
            }
        });

        if (state_id) {
            setFilteredCities(cities.filter(city => city.state_id == state_id));
        } else {
            setFilteredCities([]);
        }
    }, [state_id]);

    useEffect(() => {
        (new Users()).getData(
            `${pageUrl}&filter[number_document]=${number_document}&filter[name]=${name}&filter[email]=${email}&filter[state_id]=${state_id}&filter[city_id]=${city_id}&filter[enabled]=${enabled}`,
            token,
        ).then( resp => {
            localStorage.setItem('usersLastEndpoint', pageUrl);
            setResponse({ loading: false, ...resp });
        });
    }, [pageUrl, number_document, name, email, state_id, city_id, enabled]);

    return (
        <Container>
            <PageTitle>
                Módulo de gestión de usuarios
            </PageTitle>
            <hr className="border mb-5" />
            {
                response.loading
                    ?   <PrimaryInfoXL>Cargando...</PrimaryInfoXL>
                    :   <div className="flex flex-col justify-center items-center gap-5">
                            <div className="w-full sm:w-11/12 bg-white dark:bg-gray-800 rounded-md p-4 shadow-md">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className='col-span-1'>
                                        <input 
                                            type="text" 
                                            name='number_document'
                                            className="border border-gray-500 rounded-md px-7 py-3 placeholder:italic w-full"
                                            placeholder="Num. de documento"
                                            value={number_document}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <input 
                                            type="text" 
                                            name='name'
                                            className="border border-gray-500 rounded-md px-7 py-3 placeholder:italic w-full"
                                            placeholder="Buscar"
                                            value={name}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <input 
                                            type="email" 
                                            name='email'
                                            className="border border-gray-500 rounded-md px-7 py-3 placeholder:italic w-full"
                                            placeholder="Correo electronico"
                                            value={email}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                    <div className="relative rounded-md border border-gray-500 p-1 col-span-1">
                                        <label htmlFor="state_id" className="absolute translate-x-7 -translate-y-3 bg-white dark:bg-gray-800 w-min px-3 text-gray-600 text-sm">
                                            Estado
                                        </label>
                                        <select
                                            name="state_id"
                                            id="state_id"
                                            className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                            value={state_id}
                                            onChange={onInputChange}
                                        >
                                            <option value="">Seleccionar...</option>
                                            {   states.length != 0 &&
                                                states.map(state => {
                                                    return (
                                                        <option key={state.id} value={state.id}>
                                                            {state.name}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="relative rounded-md border border-gray-500 p-1 col-span-1">
                                        <label htmlFor="city_id" className="absolute translate-x-7 -translate-y-3 bg-white dark:bg-gray-800 w-min px-3 text-gray-600 text-sm">
                                            Ciudad
                                        </label>
                                        <select
                                            name="city_id"
                                            id="city_id"
                                            className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                            value={city_id}
                                            onChange={onInputChange}
                                        >
                                            <option value="">Seleccionar...</option>
                                            {   filteredCities.length != 0 &&
                                                filteredCities.map(city => {
                                                    return (
                                                        <option key={city.id} value={city.id}>
                                                            {city.name}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="relative rounded-md border border-gray-500 p-1 col-span-1">
                                        <label htmlFor="enabled" className="absolute translate-x-7 -translate-y-3 bg-white dark:bg-gray-800 w-min px-3 text-gray-600 text-sm">
                                            Habilitados
                                        </label>
                                        <select
                                            name="enabled"
                                            id="enabled"
                                            className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                            value={enabled}
                                            onChange={onInputChange}
                                        >
                                            <option value="">Seleccionar...</option>
                                            <option value="1">Sí</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-11/12 bg-white rounded-lg px-2 sm:px-5 md:px-10 py-6 shadow-lg flex flex-col justify-center items-center gap-5">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    <NavLink to={'/users/register/admin'}>
                                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md shadow-none hover:shadow-sm scale-100 hover:scale-105 transition duration-200">
                                            Agregar nuevo administrador
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
                                                        Nombres
                                                    </th>
                                                    <th className="hidden md:block bg-gray-300 font-bold px-2 py-5">
                                                        Correo electronico
                                                    </th>
                                                    <th className="bg-gray-300 font-bold px-2 py-5">
                                                        Estado
                                                    </th>
                                                    <th className="bg-gray-300 font-bold px-2 py-5">
                                                        Ciudad
                                                    </th>
                                                    <th className="hidden md:block bg-gray-300 font-bold px-2 py-5">
                                                        Habilitado
                                                    </th>
                                                    <th className="bg-gray-300 rounded-tr-2xl font-bold px-2 py-5">
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    response.data.data.map(user => {
                                                        return (
                                                            <tr key={user.id} className="border-b border-gray-400">
                                                                <td className="font-bold pl-4 py-2 text-center">
                                                                    { user.id }
                                                                </td>
                                                                <td className="capitalize pl-4 py-2">
                                                                    { 
                                                                        !user.second_name && !user.second_surname
                                                                            ? `${user.first_name} ${user.surname}`
                                                                            : !user.second_name 
                                                                                ? `${user.first_name} ${user.surname} ${user.second_surname}` 
                                                                                : !user.second_surname
                                                                                    ? `${user.first_name} ${user.second_name} ${user.surname}`
                                                                                    : `${user.first_name} ${user.second_name} ${user.surname} ${user.second_surname}` 
                                                                    }
                                                                </td>
                                                                <td className="hidden md:block pl-4 py-2">
                                                                    { user.email }
                                                                </td>
                                                                <td className="capitalize pl-4 py-2 text-right">
                                                                    { user.state.name }
                                                                </td>
                                                                <td className="capitalize pl-4 py-2">
                                                                    { user.city.name }
                                                                </td>
                                                                <td className="hidden md:block">
                                                                    <div className="flex justify-center items-center gap-3 capitalize">
                                                                    { 
                                                                        user.enabled
                                                                        ? <span className="text-green-600"> ● </span>
                                                                        : <span className="text-red-600"> ● </span>
                                                                    }
                                                                    {
                                                                        user.role[0]
                                                                    }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-2 md:my-0">
                                                                        {/* <NavLink to={`/products/edit/${product.slug}`}>
                                                                            <button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-md px-4 py-2 duration-200 transition">
                                                                                <PencilSquareIcon className="w-4 h-4"/>
                                                                            </button>
                                                                        </NavLink>
                                                                        <button onClick={() => {setDeleteConfirmation(true); setProductToDelete(product.slug);}} className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 duration-200 transition">
                                                                            <TrashIcon className="w-4 h-4"/>
                                                                        </button> */}
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
                                            parameters={`&include=${parameters.users.include}`}
                                        />
                                    </>
                                }
                                
                            </div>
                        </div>        
            }
        </Container>
    );
}
