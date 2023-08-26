import axios from "axios";
import { ENV } from "../../../env";

export class Orders
{
    async save(products, payment_method, token)
    {
        const { APIUrl, endPoints } = ENV;
        const { apiVersion, orders } = endPoints;

        let response;

        try {
            response = await axios.post(`${APIUrl}${apiVersion}${orders.store}`,
            {
                products,
                payment_method,
            }, {
                headers: {
                    'content-type': 'application/json, multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            response = {
                statusText: response.statusText,
                data: response.data,
            };
        } catch (error) {
            console.error(error);
            response = {
                statusText: error.response.statusText,
                errors: error.response.data,
            };
        }

        return response;
    }
    
}