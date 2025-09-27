const http = require("http");
const getUsers = require("./modules/users");
const { URL } = require("url");

const server = http.createServer((request, response) => {
  const ipAddress = "http://127.0.0.1:3003";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");

  if (url.searchParams.has("hello")) {
    if (userName && userName.trim() !== "") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end(`Hello, ${userName}!`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.end("Enter a name");
    }
    return;
  } else if (url.searchParams.has("users")) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(getUsers());
    return;
  } else if (request.url === "/") {
    response.writeHead(200, { "Content-type": "text/plain" });
    response.end("Hello, World!");
    return;
  } else if (request.url === "/favicon.ico") {
    response.writeHead(200, { "Content-Type": "image/x-icon" });
    response.end();
    return;
  } else {
    response.writeHead(500, { "Content-type": "text/plain" });
    response.end("");

    return;
  }
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
