export const ENV = {
    url: 'http://127.0.0.1:5173',
    APIUrl: 'http://127.0.0.1:8000',
    endPoints:{
        login: '/api/login',
        logout: '/api/logout',
        apiVersion: '/api/v1',
        showcase: {
            index: '/showcase',
        },
        products: {
            index: '/products',
            imagesPath: '/storage/images/products/'
        }
    },
    parameters: {
        showcase: {
            include: 'category,product_unit',
        },
        products: {
            include: 'category,product_unit',
        }
    }

}