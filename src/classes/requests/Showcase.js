import axios from "axios";
import { env } from '../env';
import { ResponseService } from "../services";

export class Showcase {

    async getData() {
        const { APIUrl, showcaseEndpoints } = env;

        try {
            const response = await axios.get(`${APIUrl}${showcaseEndpoints.getData.endPoint}`);
            return ResponseService.responseSuccess(response);
        } catch (error) {
            console.error(error);
            return ResponseService.responseError();
        }
    }

    async getDataWithParameters() {
        const { APIUrl, showcaseEndpoints } = env;

        try {
            const response = await axios.get(`${APIUrl}${showcaseEndpoints.getData.endPoint}`, {
                params: {
                    include: showcaseEndpoints.getData.parameters.include,
                }
            });
            return ResponseService.responseSuccess(response);
        } catch (error) {
            console.error(error);
            return ResponseService.responseError();
        }
    }
}