
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

addEventListener("fetch", event => {
  const headers = new Map(event.request.headers);
  console.log(event.request);
  event.respondWith(handleRequest(event.request));
});



async function handleRequest(request) {
  console.log("Got request", request);
  const response = await fetch(request);
  console.log("Got response", response);
  return response;
}

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuZXRsaWZ5Iiwic2hhMjU2IjoiZjU5YTgyNGEzYTRhOTFiOWI0MDUyN2UyNmI4ZGExZWE0MzMwNDQ4OTA1OGEwN2UzZWI3Nzc1NWYwOWU0OTBlZCJ9._ezHgQtsQriaFdqYoqiTNgUpjQT3px-_DLHByzrYJug";

const decoded = jwt.verify(token, "testnyc");
console.log(decoded);

jwt.verify(token, "testnyc", { algorithms: ["HS256"] }, function(err, payload) {
  if (err) {
    return console.log("looks like there is an error: ", err.message);
  }
  return console.log("we got a valid cert!: ", payload);
});
