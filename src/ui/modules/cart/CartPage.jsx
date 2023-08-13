import { useContext } from "react";
import { AuthContext } from "../../../context";
import { Unverified } from "../others";

export const CartPage = () => {

    const { isVerified } = useContext(AuthContext);

    return (<>
    {
        isVerified
        ? <div>CartPage</div>
        : <Unverified />
    }
    </>);
}
