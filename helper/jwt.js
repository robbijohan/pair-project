const jwt = require ('jsonwebtoken')

function generateToken( payload ){
    return jwt.sign(payload, 'GaTaU' )
}
function verifyToken( token ){
    return jwt.verify(token, 'GaTaU' )
}

module.exports = { generateToken, verifyToken }