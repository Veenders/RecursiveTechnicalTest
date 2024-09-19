import {describe, expect, beforeAll, afterAll, it, jest} from '@jest/globals';
import { createServer } from 'http';
import { getCategoryPath } from '../app/';
import { request } from 'http';

const hostname = '127.0.0.1';
const port = 3000;

jest.mock('../app/', () => ({
  getCategoryPath: jest.fn(),
}));

describe('Servidor HTTP', () => {
  let server: any;

  beforeAll((done) => {
    server = createServer((req, res) => {
      if (req.method === "GET") {
        const categoryName = req.url?.split('/')[1];
        if (!categoryName) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Bad request');
          return;
        }
        const categoryPath = getCategoryPath([], categoryName);
        if (categoryPath === "") {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Not Found');
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(categoryPath);
      } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Method Not Allowed');
      }
    }).listen(port, hostname, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  const makeRequest = (options: any, callback: (res: any) => void) => {
    const req = request(options, callback);
    req.end();
  };

  it('debería responder con un código de estado 400 para solicitudes mal formadas', (done) => {
    const options = {
      hostname,
      port,
      path: '/',
      method: 'GET',
    };

    makeRequest(options, (res) => {
      expect(res.statusCode).toBe(400);
      let data = '';
      res.on('data', (chunk: string) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(data).toBe('Bad request');
        done();
      });
    });
  });

  it('debería responder con un código de estado 404 cuando la categoría no se encuentra', (done) => {
    (getCategoryPath as jest.Mock).mockReturnValueOnce('');
    const options = {
      hostname,
      port,
      path: '/nonexistent-category',
      method: 'GET',
    };

    makeRequest(options, (res) => {
      expect(res.statusCode).toBe(404);
      let data = '';
      res.on('data', (chunk: string) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(data).toBe('Not Found');
        done();
      });
    });
  });

  it('debería responder con un código de estado 200 y el path correcto cuando la categoría se encuentra', (done) => {
    const mockPath = '/path/to/category';
    (getCategoryPath as jest.Mock).mockReturnValueOnce(mockPath);
    const options = {
      hostname,
      port,
      path: '/existing-category',
      method: 'GET',
    };

    makeRequest(options, (res) => {
      expect(res.statusCode).toBe(200);
      let data = '';
      res.on('data', (chunk: string) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(data).toBe(mockPath);
        done();
      });
    });
  });

  it('debería responder con un código de estado 405 para métodos no permitidos', (done) => {
    const options = {
      hostname,
      port,
      path: '/some-category',
      method: 'POST',
    };

    makeRequest(options, (res) => {
      expect(res.statusCode).toBe(405);
      let data = '';
      res.on('data', (chunk: string) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(data).toBe('Method Not Allowed');
        done();
      });
    });
  });
});