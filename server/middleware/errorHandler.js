const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    if (err.name === 'CastError') {
        const message = 'Invalid resource ID';
        error = {
            code: 'INVALID_ID',
            message,
            statusCode: 400
        };
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = {
            code: 'DUPLICATE_FIELD',
            message,
            statusCode: 400
        };
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = {
            code: 'VALIDATION_ERROR',
            message,
            statusCode: 400
        };
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: {
            code: error.code || 'SERVER_ERROR',
            message: error.message || 'Server Error'
        }
    });
};

module.exports = errorHandler;