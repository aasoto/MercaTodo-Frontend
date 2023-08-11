import axios from "axios";
import { env } from "../env";

export class Auth {
    async login(email, password) {

        let response;

        try {
            response = await axios.post(`${env.APIUrl}${env.authEndpoints.login}`,
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
        try {
            await axios.post(`${env.APIUrl}${env.authEndpoints.logout}`,
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
}