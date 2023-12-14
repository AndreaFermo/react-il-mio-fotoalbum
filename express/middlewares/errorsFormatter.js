module.exports = function (err, req, res, next) {
    if (err.statusCode) {
        console.error(err.statusCode)
        res.status(err.statusCode).json({
            error: err.name,
            message: err.message
        });
    }

    res.status(500).json({
        error: err.name,
        message: err.message
    })

}