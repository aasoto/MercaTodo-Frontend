import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Products } from "../../../classes";
import { AuthContext } from "../../../context";
import { useContext } from "react";

export const DeleteProductConfirmation = ({ slug, setDeleteConfirmation, setAlert, setShowAlert, setResponse, pageUrl }) => {

    const { token } = useContext(AuthContext);

    const onDeleteProduct = () => {
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
                        setDeleteConfirmation(false)
                        setTimeout(() => {
                            setShowAlert(false);
                        }, 5000);
                        break;
                }
            });
    }

    return (
        <div className="fixed w-full bg-black/40 h-full z-20 top-0 flex justify-center">
            <div className="sticky top-20 w-1/2 h-max px-10 py-5 bg-white dark:bg-gray-700 rounded-lg flex flex-col justify-center items-center gap-5">
                <QuestionMarkCircleIcon class="w-40 h-40 text-blue-600"/>
                <h1 className="text-black dark:text-white text-3xl font-bold">
                    Eliminar producto
                </h1>
                <p className="text-black dark:text-white">
                    ¿Desea usted realmente eliminar este producto?
                </p>
                <div className="flex justify-center items-center gap-5">
                    <button 
                        onClick={onDeleteProduct}
                        className="bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white px-5 py-2 rounded shadow scale-100 hover:scale-105 transition duration-200"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={() => setDeleteConfirmation(false)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow scale-100 hover:scale-105 transition duration-200"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
