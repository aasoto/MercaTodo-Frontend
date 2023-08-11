import { useEffect, useState } from "react";
import { useForm } from "../../../hooks";
import { BasicInput, BasicLabel, FormTitle, PageTitle } from "../../components";
import { MercaTodoLogo } from "../../components/images";
import { Auth, Generics } from "../../../classes";
import { ENV } from "../../../../env";

export const RegisterPage = () => {

    const { 
        type_document,
        number_document,
        first_name,
        second_name,
        surname,
        second_surname,
        birthdate,
        gender,
        phone,
        address,
        email,
        state_id,
        city_id,
        password,
        password_confirmation,
        onInputChange 
    } = useForm({
        type_document: '',
        number_document: '',
        first_name: '',
        second_name: '',
        surname: '',
        second_surname: '',
        birthdate: '',
        gender: '',
        phone: '',
        address: '',
        email: '',
        state_id: '',
        city_id: '',
        password: '',
        password_confirmation: '',
    });

    const { APIUrl, endPoints } = ENV;
    const { apiVersion, users } = endPoints;

    const [typeDocuments, setTypeDocuments] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);

    useEffect(() => {

        const genericRequest = new Generics();

        // Get types documents
        genericRequest.getData(`${APIUrl}${apiVersion}${users.typeDocuments.index}`)
            .then(resp => {
                setTypeDocuments(resp.data);
            });

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
        }
    }, [state_id]);

    const onSubmit = (event) => {
        event.preventDefault();

        (new Auth()).register(
            type_document,
            number_document,
            first_name,
            second_name,
            surname,
            second_surname,
            birthdate,
            gender,
            phone,
            address,
            email,
            state_id,
            city_id,
            password,
            password_confirmation,
        ).then(resp => {
            console.log(resp);
        });
    }

    return (
        <div className="flex flex-col justify-center items-center gap-5 py-10">
            <MercaTodoLogo height={'h-20'}/>
            <div className="w-4/5 bg-white rounded-lg px-10 py-6 shadow-lg">
                <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4">
                    <hr className="border w-full"/>
                    <FormTitle>Registro</FormTitle>
                    <hr className="border w-full"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <div className="col-span-1">
                            <label htmlFor="type_document" className="text-gray-600 text-sm font-medium">
                                Tipo de documento
                            </label>
                            <select
                                name="type_document"
                                className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                value={type_document}
                                onChange={onInputChange}
                            >
                                <option value="">Seleccionar...</option>
                                {   typeDocuments.length != 0 &&
                                    typeDocuments.map(typeDocument => {
                                        return (
                                            <option key={typeDocument.id} value={typeDocument.code}>
                                                {typeDocument.name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="number_document">
                                Número de documento
                            </BasicLabel>
                            <BasicInput 
                                type="text" 
                                name="number_document"
                                value={number_document}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="first_name">
                                Primer nombre
                            </BasicLabel>
                            <BasicInput 
                                type="text" 
                                name="first_name"
                                value={first_name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="second_name">
                                Segundo nombre
                            </BasicLabel>
                            <BasicInput 
                                type="text" 
                                name="second_name"
                                value={second_name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="surname">
                                Primer apellido
                            </BasicLabel>
                            <BasicInput 
                                type="text" 
                                name="surname"
                                value={surname}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="second_surname">
                                Segundo apellido
                            </BasicLabel>
                            <BasicInput 
                                type="text" 
                                name="second_surname"
                                value={second_surname}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="birthdate">
                                Fecha de nacimiento
                            </BasicLabel>
                            <BasicInput 
                                type="date" 
                                name="birthdate"
                                value={birthdate}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="gender">
                                Genero
                            </BasicLabel>
                            <select
                                name="gender"
                                className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                value={gender}
                                onChange={onInputChange}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="m">Másculino</option>
                                <option value="f">Femenino</option>
                                <option value="o">Otro</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="phone">
                                Telefono
                            </BasicLabel>
                            <BasicInput 
                                type="text" 
                                name="phone"
                                value={phone}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="address">
                                Dirección
                            </BasicLabel>
                            <BasicInput 
                                type="text" 
                                name="address"
                                value={address}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="state_id">
                                Estado
                            </BasicLabel>
                            <select
                                name="state_id"
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
                        <div className="col-span-1">
                            <BasicLabel htmlFor="city_id">
                                Ciudad
                            </BasicLabel>
                            <select
                                name="city_id"
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
                        <div className="col-span-1">
                            <BasicLabel htmlFor="email">
                                Correo eletronico
                            </BasicLabel>
                            <BasicInput 
                                type="email" 
                                name="email"
                                value={email}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="password">
                                Contraseña
                            </BasicLabel>
                            <BasicInput 
                                type="password" 
                                name="password"
                                value={password}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <BasicLabel htmlFor="password_confirmation">
                                Confirmación de contraseña
                            </BasicLabel>
                            <BasicInput 
                                type="password" 
                                name="password_confirmation"
                                value={password_confirmation}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-800 hover:bg-gray-900 rounded-md w-1/3 mt-4 px-10 py-3 text-white font-semibold hover:font-bold scale-100 hover:scale-105 transition duration-200"
                    >
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
}
