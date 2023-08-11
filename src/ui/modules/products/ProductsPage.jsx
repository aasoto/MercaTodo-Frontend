import { useContext, useEffect } from "react"
import { AuthContext } from "../../../context"
import { Products } from "../../../classes";
import { ENV } from "../../../../env";

export const ProductsPage = () => {

    const { token } = useContext(AuthContext);
    const { APIUrl, endPoints } = ENV;
    const { apiVersion, products } = endPoints;

    useEffect(() => {
        (new Products()).getData(
            `${APIUrl}${apiVersion}${products.index}`,
            token,
        ).then( resp => {
            console.log(resp);
        });
    }, []);

    return (
        <div>ProductsPage</div>
    )
}
