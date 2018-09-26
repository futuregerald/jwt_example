const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const verifyUser = token => jwt.verify(token, 'superSecret', { algorithms: ['HS256'] }, (err, payload) => {
    if (err) {
      return {isValid: false, payload: err.message}
    }
    const hasUserRole = payload.app_metadata.authorization.roles.includes('user')
    if (hasUserRole){
    return {isValid: true, payload: payload}
  }
  return {isValid: false, payload: "User does not have proper permissions"}
  });

const handleRequest = async request => {
  const headers = new Map(request.headers);
  const cookieHeader = headers.get('cookie');
  const cookies = cookie.parse(cookieHeader);
  console.log(cookies);
  console.log(cookies.nf_jwt);
  const verifyResponse = verifyUser(cookies.nf_jwt);
  console.log(verifyResponse);
  if (!verifyResponse.isValid) {
    const res = await fetch('https://futuregerald.app/404.html');
    return res;
  }
  const response = await fetch(request);
  return response;
};

addEventListener('fetch', event => {
  console.log('the request url is: ',event.request.url)
  console.log(event.request);
  event.respondWith(handleRequest(event.request));
});
