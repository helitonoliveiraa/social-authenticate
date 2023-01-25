import { Router } from 'express';
import { getGoogleAuthURL } from '../utils/getGoogleUrl';
import { getGoogleOAuthTokens } from '../utils/getGoogleOAuthTokens';

const fakeBrowser = Router();
/**
 * THIS ROUTES BELLOW SIMULATE THE FRONT-END ACTIONS
 */
fakeBrowser.get('/', (request, response) => {
  const url = getGoogleAuthURL();

  return response.redirect(url);
});

fakeBrowser.get('/app/sessions/oauth/google', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

fakeBrowser.get('/token', (request, response) => {
  const { code } = request.body;

  getGoogleOAuthTokens({ code }).then(resolve => {
    return response.json(resolve);
  }).catch(reject => {
    return response.json({
      error: `Failed on get token request: ${reject}`,
    });
  })
});

export { fakeBrowser };