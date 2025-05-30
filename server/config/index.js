const variables = require('./Env/variables')
const dBConecction = require('./db/connection')
const generateNormalToken = require('./jwt/jwt')
const securityConfig =require('./secuirity/secuirity')
module.exports = {
    variables: variables,
    dBConecction: dBConecction,
    generateNormalToken: generateNormalToken,
    securityConfig: securityConfig

}