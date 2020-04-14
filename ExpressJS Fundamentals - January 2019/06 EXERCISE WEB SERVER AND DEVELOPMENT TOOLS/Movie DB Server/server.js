const http = require('http');
const url = require('url');
const port = 3000;

const handlers = require('./handlers');
const fileReader = require('./config/fileReader');
const postParser = require('./config/postParser');

function mainController(req, res) {
    req.path = url.parse(req.url).pathname;
    fileReader(res);

    postParser(req, res)
        .then(postData => {
            for (let handler of handlers){
                if (handler(req, res) !== true){
                    break;
                }
            }
        });
}

http
    .createServer(mainController)
    .listen(port);

console.log(`Server listening on port: ${port}`);

