import { useContext, useEffect, useState } from "react";
import { BasicInput, BasicLabel, Container, ErrorMessage, ErrorMessageMini, LoadingAlert, MainButton } from "../../components";
import { useForm } from "../../../hooks";
import { Generics, Users } from "../../../classes";
import { AuthContext } from "../../../context";
import { ENV } from "../../../../env";

export const AddAdminPage = () => {

    const { token } = useContext(AuthContext);
    
    const { APIUrl, endPoints } = ENV;
    const { apiVersion, users } = endPoints;

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
        onInputChange,
        onResetForm, 
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
    });

    const [typeDocuments, setTypeDocuments] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);

    const [makingRequest, setMakingRequest] = useState(false);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

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

        (new Users()).registerAdmin(
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
            number_document,
            number_document,
            token,
        ).then(resp => {
            switch (resp.statusText) {
                case 'Unprocessable Content':
                    setErrors(resp.errors);
                    setMakingRequest(false);
                    break;
                case 'Created':
                    setAlert(true);
                    setShowAlert(true);
                    setMakingRequest(false);
                    onResetForm();
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 5000);
                    break;
            }
        });
    }

    return (
        <>
            <Container>
                {
                    alert &&
                    <div className={`fixed bottom-4 right-4 animate__animated ${ showAlert ? "animate__fadeInRight" : "animate__fadeOutRight" } bg-green-600/60 text-white font-semibold rounded-md px-5 py-3`}>
                        Guardado correctamente
                    </div>
                }
                <h3 className="ml-10 mb-5 text-xl font-semibold">
                    Agregar nuevo usuario administrador del sistema
                </h3>
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="w-full sm:w-11/12 bg-white rounded-lg px-2 sm:px-5 md:px-10 py-6 shadow-lg flex flex-col justify-center items-center gap-5">
                        <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                <div className="col-span-1 md:col-span-2">
                                    <ErrorMessage>{errors.message}</ErrorMessage>
                                </div>
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
                                        id="type_document"
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
                                        id="number_document"
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
                                        id="first_name"
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
                                        id="second_name"
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
                                        id="surname"
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
                                        id="second_surname"
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
                                        id="birthdate"
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
                                        id="gender"
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
                                        id="phone"
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
                                        id="address"
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
                                        id="state_id"
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
                                        id="city_id"
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
                                        id="email"
                                        value={email}
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
            </Container>
            <LoadingAlert makingRequest={makingRequest}/>
        </>
    );
}
