const jwt = require('jsonwebtoken');

const getExpDate = () => {
    const exp = Math.floor(Date.now() / 1000) + (60 * 60)
    const expReadable = new Date(exp);
    return {exp: exp,readable: expReadable}
} 

const generateJwt = ({claims, exp})=>{
    return jwt.sign({
        exp: exp,
        data: {
            app_metadata: {
            "roles": [
              "user",
              "cms"
            ]
          },
          "user_metadata": claims
        }
      }, 'superSecret');

}

exports.handler = function (event, context, callback) {
    // parsing the inbound request
    const reqBody = JSON.parse(event.body)
    // generating exp date
    const expTimes = getExpDate()
    const token = generateJwt({claims: event.body, exp: expTimes.exp })
    const response = {jwt: token, valid_through: expTimes.expReadable}

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(event.body)
    });
}