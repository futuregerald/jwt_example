const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const verifyUser = (jwt) => {
  jwt.verify(token, 'superSecret', { algorithms: ['HS256'] }, (err, payload) => {
    if (err) {
      return {isValid: false, payload: payload}
    }
    return {isValid: true, payload: payload}
  });
}

const handleRequest = async (request) => {
  const headers = new Map(request.headers);
  const cookieHeader = headers.get('cookie');
  const cookies = cookie.parse(cookieHeader);
  console.log(cookies);
  console.log(cookies.nf_jwt);
  const verifyResponse = verifyUser(cookies.nf_jwt);
  if (!verifyResponse.isValid){
    const response = await fetch('/404.html');
    return response
  }
  const response = await fetch(request);
  return response;
}

addEventListener('fetch', event => {
  console.log(event.request);
  event.respondWith(handleRequest(event.request));
});

