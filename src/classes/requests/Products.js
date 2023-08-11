import axios from "axios";
import { ResponseService } from "../services";

export class Products {
    async getData(endPoint, token) {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await axios.get(endPoint, { headers });
            console.log(response);
            return ResponseService.responseSuccess(response);
        } catch (error) {
            console.error(error);
            return ResponseService.responseError();
        }
    }
}