import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context";
import { Orders } from "../../../classes";

export const DetailOrderPage = () => {

    const { token } = useContext(AuthContext);

    const { code } = useParams();

    useEffect(() => {
        (new Orders()).show(code, token)
            .then( resp => {
                console.log(resp);
            });
    }, []);

    return (
        <div>DetailOrderPage</div>
    );
}
