const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

exports.handler = function(event, context, callback) {
  const getExpDate = () => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;
    // const expReadable = new Date(exp);
    return exp;
  };

  const generateJwt = ({ claims, exp, secret }) =>
    jwt.sign(
      {
        exp,
        app_metadata: {
          user_id: uuidv4(),
          authorization: {
            roles: ['user', 'cms'],
          },
        },
        user_metadata: claims,
      },
      secret
    );
  // parsing the inbound request
  const parsedBody = JSON.parse(event.body);
  console.log(parsedBody);
  const { claims, secret } = parsedBody;

  // generating exp date
  const expTimes = getExpDate();
  const token = generateJwt({ claims, exp: expTimes, secret });
  const response = {
    jwt: token,
    exp: expTimes,
  };

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(response),
  });
};
