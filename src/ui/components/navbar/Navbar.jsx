import { NavLink } from "react-router-dom"
import { ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useContext } from "react";
import { AuthContext } from "../../../context";
import { OptionsNavbarAdmin } from "./OptionsNavbarAdmin";
import { OptionsNavbarClient } from "./OptionsNavbarClient";
import { MercaTodoLogoGray } from "../images";
import { OptionsNavbarUnsigned } from "./OptionsNavbarUnsigned";
import { OptionNavbarCart } from "./OptionNavbarCart";

export const Navbar = () => {

    const { role } = useContext(AuthContext);

    return (
        <div className="fixed z-10 flex justify-center items-center w-full h-24 p-4">
            <nav className="w-full h-full bg-white rounded-lg px-5 md:px-10 py-2 shadow-lg">
                <div className="w-full h-full flex justify-between items-center">
                    <div className="flex justify-start items-center gap-5">
                        <NavLink to="/">
                            <MercaTodoLogoGray />
                        </NavLink>
                        { role != '' &&
                            <div className="group relative">
                                <button className="block md:hidden text-gray-400 hover:text-gray-500 font-normal hover:font-medium px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200 scale-100 hover:scale-105" >
                                    <Bars3Icon className="w-6 h-6"/>
                                </button>
                                <div className="absolute md:static hidden group-hover:block md:block">
                                    <div className="flex flex-col md:flex-row justify-start items-center ml-5 gap-3 -translate-x-14 md:translate-x-0 translate-y-8 md:translate-y-0 px-8 md:px-0 py-4 md:py-0 bg-white md:bg-transparent rounded-lg md:rounded-none shadow-lg md:shadow-none">
                                        { role === 'admin' && <OptionsNavbarAdmin /> }
                                        { role === 'client' && <OptionsNavbarClient /> }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="flex justify-end items-center gap-5">
                        { role == '' && 
                            <div className="group relative">
                                <button className="block md:hidden text-gray-400 hover:text-gray-500 font-normal hover:font-medium px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200 scale-100 hover:scale-105" >
                                    <Bars3Icon className="w-6 h-6"/>
                                </button>
                                <div className="absolute md:static hidden group-hover:block md:block">
                                    <div className="flex flex-col md:flex-row justify-start items-center ml-5 gap-3 -translate-x-36 md:translate-x-0 translate-y-8 md:translate-y-0 w-48 md:w-auto px-8 md:px-0 py-4 md:py-0 bg-white md:bg-transparent rounded-lg md:rounded-none shadow-lg md:shadow-none">
                                        <OptionsNavbarUnsigned /> 
                                    </div>
                                </div>
                            </div>    
                        }
                        { role === 'client' &&
                            <OptionNavbarCart />
                        }
                        { (role === 'admin' || role === 'client') &&
                            <button className="text-gray-400 hover:text-gray-500 font-normal hover:font-medium px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200 scale-100 hover:scale-105" title="Logout">
                                <ArrowLeftOnRectangleIcon className="w-6 h-6"/>
                            </button>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}
