import { useContext, useEffect, useState } from "react";
import { useForm } from "../../../hooks";
import { BasicInput, BasicLabel, ErrorMessage, ErrorMessageMini, FormTitle, LoadingAlert, MainButton } from "../../components";
import { MercaTodoLogo } from "../../components/images";
import { Auth, Generics } from "../../../classes";
import { ENV } from "../../../../env";
import { AuthContext } from "../../../context";
import { Navigate } from "react-router-dom";

export const RegisterPage = () => {

    const { setRole, setToken, setUserId, setIsVerified, setName } = useContext(AuthContext);

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

    const [makingRequest, setMakingRequest] = useState(false);
    const [errors, setErrors] = useState({});

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
        } else {
            setFilteredCities([]);
        }
    }, [state_id]);

    const onSubmit = (event) => {
        event.preventDefault();
        setMakingRequest(true);

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
            switch (resp.statusText) {
                case 'Unprocessable Content':
                    setErrors(resp.errors);
                    setMakingRequest(false);
                    break;
                case 'Created':
                    (new Auth()).login(email, password)
                        .then(resp => {
                            setRole(resp.data.role);
                            setToken(resp.data.access_token);
                            setUserId(resp.data.user_id);
                            setIsVerified(resp.data.email_verified_at);
                            setName(`${first_name} ${surname}`);
                            setMakingRequest(false);
        
                            <Navigate to={'/showcase'} />
                            
                        });
                    break;
            }
        });
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-5 py-10">
                <MercaTodoLogo height={'h-20'}/>
                <div className="w-4/5 bg-white rounded-lg px-10 py-6 shadow-lg">
                    <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4">
                        <hr className="border w-full"/>
                        <FormTitle>Registro</FormTitle>
                        <hr className="border w-full"/>
                        {   errors.message &&
                            <ErrorMessage>{errors.message}</ErrorMessage>
                        }
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="type_document">
                                        Tipo de documento
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.type_document}
                                    </ErrorMessageMini>
                                </div>
                                <select
                                    name="type_document"
                                    className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                    value={type_document}
                                    onChange={onInputChange}
                                    required
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
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="number_document">
                                        Número de documento
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.number_document}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="number_document"
                                    value={number_document}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="first_name">
                                        Primer nombre
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.first_name}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="first_name"
                                    value={first_name}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="second_name">
                                        Segundo nombre
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.second_name}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="second_name"
                                    value={second_name}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="surname">
                                        Primer apellido
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.surname}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="surname"
                                    value={surname}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="second_surname">
                                        Segundo apellido
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.second_surname}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="second_surname"
                                    value={second_surname}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="birthdate">
                                        Fecha de nacimiento
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.birthdate}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="date" 
                                    name="birthdate"
                                    value={birthdate}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="gender">
                                        Genero
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.gender}
                                    </ErrorMessageMini>
                                </div>
                                <select
                                    name="gender"
                                    className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                    value={gender}
                                    onChange={onInputChange}
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="m">Másculino</option>
                                    <option value="f">Femenino</option>
                                    <option value="o">Otro</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="phone">
                                        Telefono
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.phone}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="phone"
                                    value={phone}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="address">
                                        Dirección
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.address}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="address"
                                    value={address}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="state_id">
                                        Estado
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.state_id}
                                    </ErrorMessageMini>
                                </div>
                                <select
                                    name="state_id"
                                    className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                    value={state_id}
                                    onChange={onInputChange}
                                    required
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
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="city_id">
                                        Ciudad
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.city_id}
                                    </ErrorMessageMini>
                                </div>
                                <select
                                    name="city_id"
                                    className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                    value={city_id}
                                    onChange={onInputChange}
                                    required
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
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="email">
                                        Correo eletronico
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.email}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="email" 
                                    name="email"
                                    value={email}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="password">
                                        Contraseña
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.password}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="password" 
                                    name="password"
                                    value={password}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="password_confirmation">
                                        Confirmación de contraseña
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.password_confirmation}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="password" 
                                    name="password_confirmation"
                                    value={password_confirmation}
                                    onChange={onInputChange}
                                    required={true}
                                />
                            </div>
                        </div>
                        <MainButton type="submit">
                            Registrarme
                        </MainButton>
                    </form>
                </div>
            </div>
            <LoadingAlert makingRequest={makingRequest}/>
        </>
    );
}
