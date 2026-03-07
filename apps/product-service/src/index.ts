import cors from 'cors';
import express from 'express';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3002', 'http://localhost:3003'],
    credentials: true,
  })
);

app.listen(8000, () => {
  console.log('Product Service is running 8000');
});
