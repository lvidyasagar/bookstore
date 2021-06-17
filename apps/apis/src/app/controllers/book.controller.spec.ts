import { mockBooks } from '@bookstore/data';
import { getMockReq, getMockRes } from '@jest-mock/express';
import bookController from './book.controller';
import axios from 'axios';

jest.mock('axios');
describe('Book Controller', () => {
  const { res, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  afterEach(() => {
    jest.resetModules();
  });
  it('should call api and get data', async () => {
    const req = getMockReq({ params: { searchString: 'angular' } });
    const response = { data: mockBooks };
    const spy = jest.fn().mockReturnValue(Promise.resolve(response));
    (axios.get as jest.Mock).mockImplementation(spy);
    await bookController.search(req, res);
    expect(res.send).toBeCalledWith(response.data.items);
    expect(spy).toBeCalled();
  });

  it('should get error if api not returns books', async () => {
    const req = getMockReq({ params: { searchString: 'afsfhskjhfskdgsd' } });
    const spy = jest.fn().mockReturnValue(Promise.resolve(new Error('No books Found')));
    (axios.get as jest.Mock).mockImplementation(spy);
    await bookController.search(req, res);
    expect(res.send).toBeCalledWith('No books Found');
    expect(spy).toBeCalled();
  });
});
