import axios from "axios";

export class Generics {
    async getData(endPoint, token = '') {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await axios.get(endPoint, {
                headers,
            });
            
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}