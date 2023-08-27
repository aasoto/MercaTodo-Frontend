import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid"
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux";
import { add, remove, update } from "../../../redux/slices/cartSlice";

export const ProductToCart = ({product}) => {

    const { role } = useContext(AuthContext);
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        if (quantity == 1) {
            return;
        }
        setQuantity(quantity - 1);
    }
    
    const find = () => {
        return cart.find((item) => item.id === product.id);
    }

    const actionAdd = () => {
        const found = find(product.id);
        found ? updateCart() : addToCart();
    }

    const addToCart = () => {
        dispatch(add({
            id: product.id, 
            name: product.name, 
            slug: product.slug, 
            price: product.price, 
            quantity,
            stock: product.stock,
            picture: product.picture_1,
            totalPrice: product.price * quantity,
        }));
    }

    const updateCart = () => {
        dispatch(update({
            id: product.id,
            quantity,
        }));
    }

    useEffect(() => {
        const found = find(product.id);

        if (found) {
            setQuantity(found.quantity);
        }
    }, []);

    return (<>
        {   role == 'client' &&
            <div className="flex justify-center items-center gap-5">
                <div className="flex flex-col justify-center items-center">
                    <label className="font-bold text-3xl">
                        Cantidad
                    </label>
                    <div className="flex">
                        <button onClick={() => decrement()} className="rounded-md px-3 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-transparent text-gray-900 dark:text-white font-bold border-none dark:border border-transparent dark:border-white scale-100 hover:scale-105 transition duration-200">
                            <MinusIcon className="w-6 h-6"/>
                        </button>
                        <h3 className="font-bold text-3xl mx-3">
                            { quantity }
                        </h3>
                        <button onClick={() => increment()} className="rounded-md px-3 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-transparent text-gray-900 dark:text-white font-bold border-none dark:border border-transparent dark:border-white scale-100 hover:scale-105 transition duration-200">
                            <PlusIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => actionAdd()}
                    className={`flex justify-center items-center ${ find() ? 'bg-yellow-300 hover:bg-yellow-400 text-black' : 'bg-red-500 hover:bg-red-600 text-white'} gap-2 scale-100 hover:scale-105 px-5 py-3 rounded-md transition duration-200`}
                >
                    {
                        find()
                        ?   <span>Actualizar cantidad</span>
                        :   <span>Añadir al carrito</span>
                    }
                    <ShoppingCartIcon className="w-6 h-6"/>
                </button>
                {
                    find() &&
                    <button onClick={() => dispatch(remove({id: product.id}))} className="rounded-md px-5 py-3 bg-gray-200 text-gray-800 scale-100 hover:scale-105 transition duration-200">
                        <TrashIcon className="w-6 h-6"/>
                    </button>
                }
            </div>
        }
    </>);
}
