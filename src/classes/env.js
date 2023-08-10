export const env = {
    url: 'http://127.0.0.1:5173',
    APIUrl: 'http://127.0.0.1:8000',
    showcaseEndpoints: {
        getData: {
            endPoint: '/api/v1/showcase',
            parameters: {
                include: 'category,product_unit'
            }
        },
    },
    productsImagesEndpont: '/storage/images/products/',
}