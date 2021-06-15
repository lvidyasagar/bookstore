import { environment } from '../../environments/environment';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Book } from '../models/Book';
import express = require('express');

const search = async (req: express.Request, res: express.Response) => {
  if (req.params.searchString) {
    await axios
      .get(environment.googleApiUrl, {
        params: {
          q: req.params.searchString,
        },
      })
      .then((response: AxiosResponse) => {
        res.send(filterResponse(response));
      })
      .catch((error: AxiosError) => res.send(error.message));
  }
};

const filterResponse = (response: AxiosResponse) => {
  let ModifiedResponse: Book[] = [];
  if (response.data.items) {
    ModifiedResponse = response.data.items.map((book: Book) => {
      return {
        id: book.id,
        volumeInfo: {
          title: book.volumeInfo.title,
          subtitle: book.volumeInfo.subtitle,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          averageRating: book.volumeInfo.averageRating,
          imageLinks: {
            smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
          },
          publisher: book.volumeInfo.publisher,
          pageCount: book.volumeInfo.pageCount,
          language: book.volumeInfo.language,
        },
      };
    });
    return ModifiedResponse;
  } else {
     throw Error('No books Found');
  }
};

export default { search };
