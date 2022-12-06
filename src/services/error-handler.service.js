const globalErrorHandler = () => {
    return (error, request, response, next) => {
        // Error handling middleware functionality
        console.log(error);
        console.log(`error ${error.message}`); // log the error
        const status = error.status || 500;
        // send back an easily understandable error message to the caller
        response.status(status).send({
            message: error.message ?? 'Something went wrong!'
        });
    };
};

const wrapControllerWithErrorHandler = (handler = async (req, res) => {}) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (e) {
            next(e);
        }
    };
};

module.exports = {
    globalErrorHandler: globalErrorHandler,
    wrapControllerWithErrorHandler: wrapControllerWithErrorHandler
};
