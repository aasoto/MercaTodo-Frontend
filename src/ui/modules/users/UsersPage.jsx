import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context";
import { ENV } from "../../../../env";
import { Users } from "../../../classes";
import { Container, PageTitle, Paginate, PrimaryInfoXL } from "../../components";
import { NavLink } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

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

    useEffect(() => {
        (new Users()).getData(
            pageUrl,
            token,
        ).then( resp => {
            localStorage.setItem('usersLastEndpoint', pageUrl);
            setResponse({ loading: false, ...resp });
        });
    }, [pageUrl]);

    return (
        <Container>
            <PageTitle>
                Módulo de gestión de usuarios
            </PageTitle>
            <hr className="border mb-5" />
            {
                response.loading
                    ? <PrimaryInfoXL>Cargando...</PrimaryInfoXL>
                    : 
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="w-full sm:w-11/12 bg-white rounded-lg px-2 sm:px-5 md:px-10 py-6 shadow-lg flex flex-col justify-center items-center gap-5">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <NavLink to={'/users/register/admin'}>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md shadow-none hover:shadow-sm scale-100 hover:scale-105 transition duration-200">
                                        Agregar nuevo administrador
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
                                            Nombres
                                        </th>
                                        <th className="hidden md:block bg-gray-300 font-bold px-2 py-5">
                                            Correo electronico
                                        </th>
                                        <th className="bg-gray-300 font-bold px-2 py-5">
                                            Ciudad
                                        </th>
                                        <th className="bg-gray-300 font-bold px-2 py-5">
                                            Estado
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
                        </div>
                    </div>
            }
        </Container>
    );
}
