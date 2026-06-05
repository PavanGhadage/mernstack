const http = require("http");
const { text } = require("stream/consumers");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("hello this nod ejs codem");
});

server.listen(3000, () => {
  console.log("Server started at http://127.0.0.1:3000");
});
