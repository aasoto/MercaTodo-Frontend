import { RoundedInfo } from "../../components"

export const DescriptionProduct = ({ product }) => {
    
    return (
        <div className="flex flex-col gap-4">
            <RoundedInfo>
                {product.product_category.name}
            </RoundedInfo>
            <div className="text-right text-black dark:text-white">
                <h3 className="text-4xl font-bold">
                    {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                </h3>
                <h6 className="font-extralight italic">
                    cada {product.product_unit.name}
                </h6>
            </div>
            <div
                className="text-lg text-black dark:text-white"
                dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
            <div className="rounded-lg border-2 border-gray-500 w-full px-10 py-4 text-center text-gray-500 text-xl font-semibold">
                Quedan
                <span className={product.stock <= 5 ? "font-bold text-red-500" : "font-bold text-gray-700"}>
                    {` ${product.stock} `}
                </span>
                {product.product_unit.name + ' '} en stock.
            </div>
        </div>
    );
}
