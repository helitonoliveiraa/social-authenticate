import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import session from 'express-session';

import { router } from './routes/users.routes';
import { fakeBrowser } from './routes/fake.browser.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(fakeBrowser);

app.listen(4000, () => {
  console.log('Server running...');
});