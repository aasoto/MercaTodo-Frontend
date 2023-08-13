import { useContext } from "react"
import { AuthContext } from "../../../context"
import { Unverified } from "../others";

export const OrdersPage = () => {

  const { isVerified } = useContext(AuthContext);

  return (<>
    {
      isVerified
        ? <div>OrdersPage</div>
        : <Unverified />
    }
  </>);
}
