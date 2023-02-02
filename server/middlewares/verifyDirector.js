module.exports = (req, res, next) => {    
    if (req.user.type === 'director') {
        return next()
    }

    return res.sendStatus(403)
}