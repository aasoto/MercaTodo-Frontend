import axios from "axios";

export class Generics {
    async getData(endPoint) {
        try {
            const response = await axios.get(endPoint, {
                'Content-Type': 'application/json',
            });
            
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}