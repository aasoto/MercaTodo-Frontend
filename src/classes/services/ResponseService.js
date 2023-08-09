export class ResponseService
{
    static responseSuccess (response)
    {
        if (response.status == 200) {
            return {
                message: 'successfully retrieved',
                data: response.data,
            };
        } else {
            return {
                message: 'something went wrong',
                status: response.status,
                statusText: response.statusText,
            };
        }
    }

    static responseError ()
    {
        return {
            message: 'error'
        };
    }
}