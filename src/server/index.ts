import { createServer } from 'node:http';
import { categories } from '../data/';
import { getCategoryPath } from '../app/';
import { ServerResponse, IncomingMessage } from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const response = (res: ServerResponse<IncomingMessage> & { req: IncomingMessage; }, statusCode: number, message: string) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/plain');
  res.end(message);
};

const server = createServer((req, res) => {
  if (req.method === "GET"){
    const categoryName = req.url?.split('/')[1];
    if (!categoryName) {
      response(res, 400, 'Bad request');
      return;
    }
    const categoryPath = getCategoryPath(categories, categoryName);
    if (categoryPath === "") {
      response(res, 404, 'Not Found');
      return;
    }
    response(res, 200, categoryPath);
  } else {
    response(res, 405, 'Method Not Allowed');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

