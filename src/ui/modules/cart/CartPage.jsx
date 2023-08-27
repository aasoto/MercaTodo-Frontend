import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context";
import { Unverified } from "../others";
import { Container, DangerInfoXL } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { remove, update } from "../../../redux/slices/cartSlice";
import { Generics, Orders } from "../../../classes";
import { ENV } from "../../../../env";
import { useForm } from "../../../hooks";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {

    const { APIUrl, endPoints } = ENV;
    const { apiVersion, orders } = endPoints;

    const { token, isVerified } = useContext(AuthContext);
    const navigate = useNavigate();

    const { payment_method, onInputChange } = useForm({
        payment_method: '',
    });

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [errors, setErrors] = useState([]);

    const decrementProductQuantity = (id, price, quantity) => {
        if (quantity == 1) {
            return;
        }
        quantity--;
        const totalPrice = price * quantity;

        dispatch(
            update({
                id, 
                quantity, 
                totalPrice
            })
        );
    }

    const incrementProductQuantity = (id, price, quantity, stock) => {
        if (quantity == stock) {
            return;
        }
        quantity++;
        const totalPrice = price * quantity;
        
        dispatch(
            update({
                id, 
                quantity, 
                totalPrice,
            })
        );
    }

    useEffect(() => {
        const genericRequest = new Generics();
        
        genericRequest.getData(`${APIUrl}${apiVersion}${orders.paymentMethods.index}`, token)
            .then(resp => {
                setPaymentMethods(resp.data);
            });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(cart);
        (new Orders()).save(
            cart,
            payment_method,
            token,
        ).then(resp => {
            switch (resp.statusText) {
                case 'Created':
                    navigate(`../order/${resp.data.orderCode}`);
                    break;
                case 'Bad Request':
                    if (resp.errors.message == 'Order rejected') {
                        setErrors(resp.errors.limitatedStock);
                    }
                    break;
            }
                
        });
    }
    return (<>
        {
            isVerified
                ? <Container>
                    <div className="flex justify-center items-center gap-5">
                        <div className="w-full sm:w-11/12 bg-white rounded-lg px-2 sm:px-5 md:px-10 py-6 shadow-lg flex flex-col justify-center items-center gap-5">
                            {
                                cart.length == 0
                                ? <DangerInfoXL>Carrito de compras vacio</DangerInfoXL>
                                : 
                                <>
                                    <form onSubmit={onSubmit} className="flex justify-end items-center w-full gap-5">
                                        <div className="relative rounded-md border border-gray-500 p-1">
                                            <label htmlFor="payment_method" className="absolute translate-x-7 -translate-y-3 bg-white dark:bg-gray-800 w-max px-3 text-gray-600 text-sm">
                                                Metodo Pago
                                            </label>
                                            <select
                                                name="payment_method"
                                                id="payment_method"
                                                className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                                value={payment_method}
                                                onChange={onInputChange}
                                                required
                                            >
                                                <option value="">Seleccionar...</option>
                                                {   paymentMethods.length != 0 &&
                                                    paymentMethods.map(payment => {
                                                        return (
                                                            <option value={payment.code} key={payment.id}>{payment.name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md shadow-none hover:shadow-sm scale-100 hover:scale-105 transition duration-200">
                                            Confirmar orden
                                        </button>
                                    </form>
                                    <h2 className={`${errors.length == 0 ? 'hidden' : 'block'} text-red-600 text-lg`}>No hay existencias suficientes para suplir la orden, por favor verifique cuantas unidades quedan de los diferentes productos.</h2>
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
                                                            {
                                                                errors &&
                                                                <h6 className="text-red-600 text-xs">
                                                                    {errors.map((item) => {
                                                                        if (item.id == product.id) {
                                                                            return `Solo hay ${item.stock} existencias para este producto.`;
                                                                        }
                                                                    })}
                                                                </h6>
                                                            }
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
                                                            <button onClick={() => decrementProductQuantity(product.id, product.price, product.quantity)} className="rounded-md px-3 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-transparent text-gray-900 dark:text-white font-bold border-none dark:border border-transparent dark:border-white scale-100 hover:scale-105 transition duration-200">
                                                                <MinusIcon className="w-6 h-6"/>
                                                            </button>
                                                            <button onClick={() => incrementProductQuantity(product.id, product.price, product.quantity, product.stock)} className="rounded-md px-3 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-transparent text-gray-900 dark:text-white font-bold border-none dark:border border-transparent dark:border-white scale-100 hover:scale-105 transition duration-200">
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
                                </>
                            }
                        </div>
                    </div>
                </Container>
                : <Unverified />
        }
    </>);
}
