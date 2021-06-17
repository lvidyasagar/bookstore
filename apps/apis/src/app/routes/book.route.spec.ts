import * as request from 'supertest';
import app from '../../main';
import { mockBooks } from '@bookstore/data';
import moxios = require('moxios');

describe('Book Routes', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch data from google books api', async (done) => {
    moxios.stubRequest(
      'https://www.googleapis.com/books/v1/volumes?q=angular',
      {
        status: 200,
        response: mockBooks,
      }
    );

    await request(app).get('/books/search/angular');
    expect(moxios.requests.mostRecent().url).toBe(
      'https://www.googleapis.com/books/v1/volumes?q=angular'
    );
    done();
  });

  it('should return status 200 ', async (done) => {
    moxios.stubRequest(
      'https://www.googleapis.com/books/v1/volumes?q=angular',
      {
        status: 200,
        response: mockBooks,
      }
    );

    const response = await request(app).get('/books/search/angular');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockBooks.items);
    done();
  });

  it('should return status 404 if search string not sent in the url', async (done) => {
    moxios.stubRequest('https://www.googleapis.com/books/v1/volumes?q=', {
      status: 404,
    });

    const response = await request(app).get('/books/search/');
    expect(response.statusCode).toBe(404);
    done();
  });
});
