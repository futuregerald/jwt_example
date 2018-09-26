const jwt = require('jsonwebtoken');

exports.handler = function(event, context, callback) {
  const parsedBody = JSON.parse(event.body);
  const token = parsedBody.jwt;
  const decoded = jwt.verify(token, 'superSecret');

  console.log(decoded);

  jwt.verify(
    token,
    'superSecret',
    { algorithms: ['HS256'] },
    (err, payload) => {
      if (err) {
        console.log('looks like there is an error: ', err.message);
        return callback(null, {
          statusCode: 401,
          body: JSON.stringify(err.message),
        });
      }

      return callback(null, {
        statusCode: 200,
        body: 'Signature verified',
      });
    }
  );
};
