import { useContext } from "react";
import { AuthContext } from "../../../context";
import { Unverified } from "../others";
import { Container } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { remove, update } from "../../../redux/slices/cartSlice";

export const CartPage = () => {

    const { isVerified } = useContext(AuthContext);

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const decrementProductQuantity = (id, quantity) => {
        if (quantity == 1) {
            return;
        }
        dispatch(update({id, quantity: quantity - 1}));
    }

    const incrementProductQuantity = (id, quantity, stock) => {
        if (quantity == stock) {
            return;
        }
        dispatch(update({id, quantity: quantity + 1}));
    }

    return (<>
        {
            isVerified
                ? <Container>
                    <div className="flex justify-center items-center gap-5">
                        <div className="w-full sm:w-11/12 bg-white rounded-lg px-2 sm:px-5 md:px-10 py-6 shadow-lg flex flex-col justify-center items-center gap-5">
                            {
                                cart.map(product => {
                                    return (
                                        <div key={product.id} className="w-full border-t border-b border-gray-300 px-5 py-3">
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
                                                <div className="col-span-1">
                                                    <img
                                                        className="h-32"
                                                        src={product.picture}
                                                        alt={`picture_${product.slug}`}
                                                    />
                                                </div>
                                                <div className="col-span-1 sm:col-span-2">
                                                    <h2 className="text-gray-900 font-semibold text-2xl capitalize">
                                                        {product.name}
                                                    </h2>
                                                    <h4 className="text-gray-800 text-lg">
                                                        Precio: {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                                    </h4>
                                                    <h4 className="text-gray-800 text-lg">
                                                        Cantidad: {product.quantity}
                                                    </h4>
                                                    <h3 className="text-gray-900 italic text-xl">
                                                        Precio total: <span className="font-bold">{(product.price * product.quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
                                                    </h3>
                                                </div>
                                                <div className="col-span-1 flex justify-center items-center gap-3">
                                                    <button onClick={() => decrementProductQuantity(product.id, product.quantity)} className="rounded-md px-3 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-transparent text-gray-900 dark:text-white font-bold border-none dark:border border-transparent dark:border-white scale-100 hover:scale-105 transition duration-200">
                                                        <MinusIcon className="w-6 h-6"/>
                                                    </button>
                                                    <button onClick={() => incrementProductQuantity(product.id, product.quantity, product.stock)} className="rounded-md px-3 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-transparent text-gray-900 dark:text-white font-bold border-none dark:border border-transparent dark:border-white scale-100 hover:scale-105 transition duration-200">
                                                        <PlusIcon className="w-6 h-6"/>
                                                    </button>
                                                    <button onClick={() => dispatch(remove({id: product.id}))} className="bg-red-600 rounded-md px-3 py-2 text-white p-1">
                                                        <TrashIcon className="w-6 h-6"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </Container>
                : <Unverified />
        }
    </>);
}
