import 'dotenv/config';
import express from 'express';

import { router } from './routes/users.routes';
import { fakeBrowser } from './routes/browser.routes';

const app = express();
app.use(express.json());

app.use(router);
app.use(fakeBrowser);

app.listen(4000, () => {
  console.log('Server running...');
});