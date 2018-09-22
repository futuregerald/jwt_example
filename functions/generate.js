
var jwt = require('jsonwebtoken');

exports.handler = function(event, context, callback) {
    const getExpDate = () => {
        const exp = Math.floor(Date.now() / 1000) + (60 * 60)
        // const expReadable = new Date(exp);
        return exp
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
    // parsing the inbound request
    const reqBody = JSON.parse(event.body)
    // generating exp date
    const expTimes = getExpDate()
    const token = generateJwt({claims: reqBody, exp: exp })
    const response = {
        "jwt": token, 
        "exe": expTimes.exp,
    }

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
    });
}