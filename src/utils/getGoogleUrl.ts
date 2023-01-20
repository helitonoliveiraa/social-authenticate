export function getGoogleAuthURL() {
  const rooUrl = process.env.ROOT_AUTH_URL;

  const options = {
    redirect_uri: process.env.REDIRECT_URL as string,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      process.env.APIS_USERINFO_PROFILE,
      process.env.APIS_USERINFO_EMAIL,
    ].join(' '),
  }

  const qs = new URLSearchParams(options);

  return `${rooUrl}?${qs.toString()}`;
}