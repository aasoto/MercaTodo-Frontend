import { NavLink, Navigate } from "react-router-dom";
import { useForm } from "../../../hooks";
import { MercaTodoLogo } from "../../components/images";
import { Auth } from "../../../classes";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context";
import { LoadingAlert } from "../../components";

export const LoginPage = () => {

    const { setRole, setToken, setUserId, setIsVerified, setName } = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const [makingRequest, setMakingRequest] = useState(false);

    const { email, password, onInputChange } = useForm({
        email: '',
        password: '',
    });

    const onSubmit = (event) => {
        event.preventDefault();
        setMakingRequest(true);

        (new Auth()).login(email, password)
        .then(resp => {
            switch (resp.statusText) {
                case 'OK':
                    setRole(resp.data.role);
                    setToken(resp.data.access_token);
                    setUserId(resp.data.user_id);
                    setIsVerified(resp.data.email_verified_at);
                    setName(resp.data.name);
                    setMakingRequest(false);

                    if (resp.data.role == 'admin') {
                        <Navigate to={'/products'} />
                    }
                    if (resp.data.role == 'client') {
                        <Navigate to={'/showcase'} />
                    }
                    break;
                case 'Unprocessable Content':
                    setErrors(resp.errors);
                    setMakingRequest(false);
                    break;
            }
        });
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-4/5 sm:w-3/5 lg:w-2/5 bg-white rounded-lg px-10 py-6 shadow-lg">
                    <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4">
                        <MercaTodoLogo height={'h-20'}/>
                        <hr className="border w-full"/>
                        { errors.message &&
                            <div className="relative w-full h-4">
                                <h6 className="absolute left-0 top-0 text-red-600 text-sm">{errors.message}</h6>
                            </div>
                        }
                        { errors.errors?.email &&
                            <div className="relative w-full">
                                <h6 className="absolute left-0 top-0 text-red-600 text-xs">{errors.errors.email}</h6>
                            </div>
                        }
                        <input 
                            name="email"
                            type="email" 
                            className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                            placeholder="Correo electronico" 
                            value={email}
                            onChange={onInputChange}
                        />
                        { errors.errors?.password &&
                            <div className="relative w-full">
                                <h6 className="absolute left-0 top-0 text-red-600 text-xs">{errors.errors.password}</h6>
                            </div>
                        }
                        <input 
                            name="password"
                            type="password" 
                            className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                            placeholder="Contraseña" 
                            value={password}
                            onChange={onInputChange}
                        />
                        <hr className="border w-full"/>
                        <div className="flex justify-between items-center gap-3 w-full">
                            <NavLink to={'/register'} className="text-gray-600 hover:text-gray-700 no-underline hover:underline">
                                Crear cuenta
                            </NavLink>
                            <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white font-bold px-5 py-2 rounded-md scale-100 hover:scale-105 transition duration-200">
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <LoadingAlert makingRequest={makingRequest}/>
        </>
    );
}
