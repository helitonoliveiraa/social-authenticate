import { Router } from 'express';
import { getGoogleAuthURL } from '../utils/getGoogleUrl';

const fakeBrowser = Router();

/**
 * This routes bellow simulate the front-end actions
 */
fakeBrowser.get('/', (request, response) => {
  const url = getGoogleAuthURL();

  return response.redirect(url);
});

fakeBrowser.get('/app/sessions/oauth/google', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { fakeBrowser };