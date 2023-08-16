import axios from "axios";
import { ResponseService } from "../services";
import { ENV } from "../../../env";

export class Products {
    async getData(endPoint, token) {

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

    async save(
        name,
        products_category_id,
        barcode,
        description,
        price,
        unit,
        stock,
        picture_1,
        picture_2,
        picture_3,
        token,
    ) {
        const { APIUrl, endPoints } = ENV;
        const { apiVersion, products } = endPoints;

        let response;

        try {
            response = await axios.post(`${APIUrl}${apiVersion}${products.store}`,
            {
                name,
                products_category_id,
                barcode,
                description,
                price,
                unit,
                stock,
                picture_1: picture_1,
                picture_2,
                picture_3,
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

    async update (
        id,
        name,
        products_category_id,
        barcode,
        description,
        price,
        unit,
        stock,
        picture_1,
        picture_2,
        picture_3,
        availability,
        token,
    ) {
        const { APIUrl, endPoints } = ENV;
        const { apiVersion, products } = endPoints;

        let response;

        const fd = new FormData();
        fd.append('name', name);
        fd.append('products_category_id', products_category_id);
        fd.append('barcode', barcode);
        fd.append('description', description);
        fd.append('price', price);
        fd.append('unit', unit);
        fd.append('stock', stock);
        fd.append('availability', availability);
        fd.append('_method', 'PATCH');

        try {
            response = await axios.post(`${APIUrl}${apiVersion}${products.edit}/${id}`,
            fd,
            {
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

    async updateProductImages(product_id, picture_number, image_file, token) {

        const { APIUrl, endPoints } = ENV;
        const { apiVersion, products } = endPoints;

        let response;

        try {
            response = await axios.post(`${APIUrl}${apiVersion}${products.updateImage}`,
            {
                product_id,
                picture_number,
                image_file,
            },
            {
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

    async delete(slug, token) {

        const { APIUrl, endPoints } = ENV;
        const { apiVersion, products } = endPoints;

        let response;
        try {
            response = await axios.delete(`${APIUrl}${apiVersion}${products.delete}/${slug}`,
            {
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