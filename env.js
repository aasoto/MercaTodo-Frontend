export const ENV = {
    url: 'http://127.0.0.1:5173',
    APIUrl: 'http://127.0.0.1:8000',
    endPoints:{
        login: '/api/login',
        logout: '/api/logout',
        register: '/api/register/client',
        apiVersion: '/api/v1',
        showcase: {
            index: '/showcase',
        },
        products: {
            index: '/products',
            store: '/product',
            show: '/product',
            imagesPath: '/storage/images/products/',
            categories: {
                index: '/product_categories',
            },
            units: {
                index: '/units',
            },
        },
        users: {
            typeDocuments: {
                index: '/type_documents',
            },
            states: {
                index: '/states',
            },
            cities: {
                index: '/cities',
            },
        },
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