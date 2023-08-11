import { useContext, useEffect } from "react"
import { AuthContext } from "../../../context"
import { Products, env } from "../../../classes";

export const ProductsPage = () => {

    const { token } = useContext(AuthContext);

    useEffect(() => {
        (new Products()).getData(
            `${env.APIUrl}${env.productsEndpoints.getData.endPoint}`,
            token,
        ).then( resp => {
            console.log(resp);
        });
    }, []);

    return (
        <div>ProductsPage</div>
    )
}
