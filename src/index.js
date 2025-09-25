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
      response.end(`Hello, ${userName}.`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.end("Enter a name");
    }
    return;
  } else if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  } else if (request.url === "/") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write("Hello, World!");
    response.end();
    return;
  } else {
    response.statusCode = 500;
    response.statusMessage = "Server Error";
    response.header = "Content-Type: text/plain";
    response.write("");
    response.end();

    return;
  }

  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
