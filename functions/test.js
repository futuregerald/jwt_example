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
const expTimes = getExpDate()


console.log(generateJwt({claims: {gerald:"is awesome"}, exp: expTimes.exp }));