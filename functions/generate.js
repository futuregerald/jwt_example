
var jwt = require('jsonwebtoken');

exports.handler = function(event, context, callback) {
    const getExpDate = () => {
        const exp = Math.floor(Date.now() / 1000) + (60 * 60)
        // const expReadable = new Date(exp);
        return exp
    } 
    
    const generateJwt = ({claims, exp, secret})=>{ 
        return jwt.sign({
            exp: exp,
            data: {
                app_metadata: {
                "roles": [
                  "user",
                  'cms'
                ]
              },
              "user_metadata": claims
            }
          }, secret ? secret : 'superSecret');
    
    }
    // parsing the inbound request
    const parsedBody = JSON.parse(event.body)
    console.log(parsedBody)
    const {claims,secret}  = parsedBody

    // generating exp date
    const expTimes = getExpDate()
    const token = generateJwt({claims: claims, exp: expTimes, secret: secret })
    const response = {
        "jwt": token, 
        "exep": expTimes,
    }

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
    });
}