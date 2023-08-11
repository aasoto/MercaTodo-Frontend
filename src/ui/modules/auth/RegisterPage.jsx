import { useEffect } from "react";
import { useForm } from "../../../hooks";
import { PageTitle } from "../../components";
import { MercaTodoLogo } from "../../components/images";

export const RegisterPage = () => {

    const { 
        type_document,
        number_document,
        first_name,
        second_name,
        surname,
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

    useEffect(() => {
        
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div className="flex flex-col justify-center items-center gap-5 h-screen">
            <MercaTodoLogo height={'h-20'}/>
            <div className="w-4/5 bg-white rounded-lg px-10 py-6 shadow-lg">
                <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4">
                    <hr className="border w-full"/>
                    <PageTitle>Registro</PageTitle>
                    <hr className="border w-full"/>
                    <div className="grid grid-cols-2 gap-5 w-full">
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
                                <option value="1">Cedula</option>
                                <option value="2">Tarjeta</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
