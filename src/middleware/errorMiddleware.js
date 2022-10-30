
const errorMiddleware = (error, req, res, next) => {

    return res.status(400).json({
        status: 'error',
        path:req.path,
        method:req.method,
        message: error.message
    })
}
module.exports = errorMiddleware;