import axios from "axios";
import { ENV } from "../../../env";

export class Auth {

    async login(email, password) {
        const { APIUrl, endPoints } = ENV;

        let response;

        try {
            response = await axios.post(`${APIUrl}${endPoints.login}`,
                {
                    email,
                    password
                }, {
                headers: {
                    "content-type": "application/json"
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

    async logout(userId) {
        const { APIUrl, endPoints } = ENV;

        try {
            await axios.post(`${APIUrl}${endPoints.logout}`,
                {
                    user_id: userId,
                }, {
                headers: {
                    "content-type": "application/json"
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async register(
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
    ) {

        const { APIUrl, endPoints } = ENV;

        let response;

        try {
            response = await axios.post(`${APIUrl}${endPoints.register}`,
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
                    "content-type": "application/json"
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