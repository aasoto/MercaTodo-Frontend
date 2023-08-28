import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context";
import { Orders } from "../../../classes";
import { Container, PrimaryInfoXL } from "../../components";

export const DetailOrderPage = () => {

    const { token } = useContext(AuthContext);

    const { code } = useParams();

    const [response, setResponse] = useState({ loading: true });
    const [order, setOrder] = useState({});
    const [detailOrder, setDetailOrder] = useState({});

    useEffect(() => {
        (new Orders()).show(code, token)
            .then( resp => {
                setResponse({ loading: false, ...resp });
                setOrder({...resp.data.order});
                setDetailOrder({...resp.data.products_by_order});
            });
    }, []);

    const convertDate = (date, GMT = 0) => {
        let res = new Date(date);
        return res.setHours(res.getHours() + GMT);
    }

    const openPaymentSuite = (url) => {
        window.open(url, '_blank');
    }

    return (
        <Container>
            <hr className="border" />
            {
                response.loading
                    ? <PrimaryInfoXL>Cargando...</PrimaryInfoXL>
                    : <>
                        <div className="w-full bg-white dark:bg-gray-800 rounded-md mt-2 p-4 shadow-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="col-span-1 flex">
                                    <div className="bg-gray-300 w-1/3 rounded-l-md px-4 py-2 font-bold">
                                        Código:
                                    </div>
                                    <div className="bg-gray-100 w-2/3 rounded-r-md px-4 py-2">
                                        { order.code }
                                    </div>
                                </div>
                                <div className="col-span-1 flex">
                                    <div className="bg-gray-300 w-1/3 rounded-l-md px-4 py-2 font-bold">
                                        Fecha de compra:
                                    </div>
                                    <div className="bg-gray-100 w-2/3 rounded-r-md px-4 py-2">
                                        { (new Date(convertDate(order.purchase_date, -5))).toLocaleString() }
                                    </div>
                                </div>
                                <div className="col-span-1 flex">
                                    <div className="bg-gray-300 w-1/3 rounded-l-md px-4 py-2 font-bold">
                                        Estado:
                                    </div>
                                    <div className="bg-gray-100 w-2/3 capitalize rounded-r-md px-4 py-2">
                                        { order.payment_status }
                                    </div>
                                </div>
                                <div className="col-span-1 flex">
                                    <div className="bg-gray-300 w-1/3 rounded-l-md px-4 py-2 font-bold">
                                        Total orden:
                                    </div>
                                    <div className="bg-gray-100 w-2/3 font-bold rounded-r-md px-4 py-2">
                                        { order.purchase_total.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white dark:bg-gray-800 rounded-md mt-2 p-4 shadow-md">
                            <div className="flex flex-col justify-center items-center gap-5">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="bg-gray-300 rounded-tl-md font-bold px-2 py-3">
                                                Producto
                                            </th>
                                            <th className="bg-gray-300 font-bold px-2 py-3">
                                                Valor unitario
                                            </th>
                                            <th className="bg-gray-300 font-bold px-2 py-3">
                                                Cantidad
                                            </th>
                                            <th className="bg-gray-300 rounded-tr-md font-bold px-2 py-3">
                                                Valor total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            detailOrder.data.map( product => {
                                                return (
                                                    <tr key={product.slug} className="border-b border-gray-400">
                                                        <td className="capitalize pl-4 py-2">
                                                            { product.name }
                                                        </td>
                                                        <td className="pr-4 py-2 text-right">
                                                            { product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) }
                                                        </td>
                                                        <td className="capitalize text-center pl-4 py-2">
                                                            { product.quantity }
                                                        </td>
                                                        <td className="pr-4 py-2 font-bold text-right">
                                                            { (product.price * product.quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) }
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="bg-gray-300 rounded-bl-md font-bold text-right px-2 py-3" colSpan={3}>
                                                Total de la orden
                                            </td>
                                            <td className="bg-gray-300 rounded-br-md font-bold text-right text-xl px-2 py-3">
                                                { order.purchase_total.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) }
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="flex justify-end items-center gap-4 w-full">
                                    <button onClick={() => openPaymentSuite(order.url)} className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md shadow-none hover:shadow-sm scale-100 hover:scale-105 transition duration-200">
                                        Pagar orden
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </Container>
    );
}
