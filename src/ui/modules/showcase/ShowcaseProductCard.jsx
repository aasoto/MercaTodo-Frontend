import { Link } from "react-router-dom"
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

export const ShowcaseProductCard = ({id, name, slug, picture_1, stock, price, product_category, product_unit}) => {
    
    const cart = useSelector((state) => state.cart)

    const find = () => {
        return cart.find((item) => item.id === id);
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md p-4 shadow-md hover:shadow-lg scale-100 hover:scale-105 transition duration-200 flex flex-col gap-4">
            <Link to={`/product/${slug}`} className="relative">
                <img
                    className="w-full h-56 rounded object-cover object-center cursor-pointer"
                    src={`${picture_1}`}
                    alt="product_image_1"
                />
                <div className="absolute top-5 right-5">
                    {
                        find() &&
                        <div className="relative h-12 w-12 bg-black/40 flex items-center justify-center rounded-full">
                            <ShoppingCartIcon className="w-6 h-6 text-white"/>
                        </div>
                    }
                    {
                        stock == 0 &&
                        <div className="relative h-12 w-max px-2 bg-black/40 flex items-center justify-center rounded-md text-white">
                            AGOTADO
                        </div>
                    }
                </div>
                <h2 className="text-lg truncate font-medium hover:font-bold no-underline hover:underline cursor-pointer capitalize">
                    { name }
                </h2>
                <div className="px-3 py-1 border border-gray-600 dark:border-gray-500 rounded-full w-max shadow-none hover:shadow scale-100 hover:scale-105 transition duration-200 cursor-pointer">
                    <h5 className="text-gray-600 dark:text-gray-500 text-sm font-light capitalize">
                        { product_category.name }
                    </h5>
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-right">
                        { price.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) }
                    </h1>
                    <h5 className="text-gray-400 italic text-sm text-right lowercase">
                        cada { product_unit.name }
                    </h5>
                </div>
            </Link>
        </div>
    );
}

