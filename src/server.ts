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

// app.use(session({
//   secret: 'key that will sign cookie',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 60 * 60 * 1 }
// }));

// app.use(cookieSession({
//   secret: process.env.JWT_SECRET,
//   maxAge: 60 * 60 * 24,
//   secure: false,
// }));

app.use(router);
app.use(fakeBrowser);

// app.get('/test', (req, res) => {
//   req.session.isAuth = true;
//   console.log(req.session);
//   console.log(req.session.id);
//   res.send('Heelooo sessions');
// });

app.listen(4000, () => {
  console.log('Server running...');
});