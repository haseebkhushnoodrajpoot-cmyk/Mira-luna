// GET /auth/callback
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const cookies = request.headers.get('Cookie') || '';
  const getCookie = (name) => {
    const match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const storedState = getCookie('oauth_state');
  const redirectUri = getCookie('redirect_uri') || `${url.origin}/admin`;

  if (!state || state !== storedState) {
    return new Response('Invalid state', { status: 400 });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return new Response('Failed to get access token', { status: 400 });
  }

  const redirectTo = new URL(redirectUri);
  redirectTo.searchParams.set('access_token', accessToken);

  const clearCookie = (name) => `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly`;

  return new Response(null, {
    status: 302,
    headers: {
      'Location': redirectTo.toString(),
      'Set-Cookie': [clearCookie('oauth_state'), clearCookie('redirect_uri')],
    },
  });
}