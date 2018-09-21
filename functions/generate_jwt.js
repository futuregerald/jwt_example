const jwt = require('jsonwebtoken');

const generateJwt = (claims)=>{
    jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar'
      }, 'superSecret');

}

exports.handler = function (event, context, callback) {

    console.log("got a request! I'm sending back the request body now")
    console.log(event.body)
    const reqBody = JSON.parse(event.body)
    

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(event.body)
    });
}