import axios from "axios";
import { ResponseService } from "../services";
import { ENV } from "../../../env";

export class Users
{
    async getData(endPoint, token)
    {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await axios.get(endPoint, { headers });
            return ResponseService.responseSuccess(response);
        } catch (error) {
            console.error(error);
            return ResponseService.responseError();
        }
    }

    async registerAdmin(
        type_document,
        number_document,
        first_name,
        second_name,
        surname,
        second_surname,
        birthdate,
        gender,
        phone,
        address,
        email,
        state_id,
        city_id,
        password,
        password_confirmation,
        token,
    ) {
        const { APIUrl, endPoints } = ENV;
        const { apiVersion, users } = endPoints;
     
        let response;

        try {
            response = await axios.post(`${APIUrl}${apiVersion}${users.registerAdmin}`,
            {
                type_document,
                number_document,
                first_name,
                second_name,
                surname,
                second_surname,
                birthdate,
                gender,
                phone,
                address,
                email,
                state_id,
                city_id,
                password,
                password_confirmation,
            }, {
                headers: {
                    'content-type': 'application/json',
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