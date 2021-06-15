import * as express from 'express';
import bookRoutes from './app/routes/book.route';
import * as cors from 'cors'

const app = express();

app.use(cors());

app.use('/books',bookRoutes)
const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/books`);
});

server.on('error', console.error);
