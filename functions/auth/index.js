// GET /auth
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const redirectUri = url.searchParams.get('redirect_uri') || `${url.origin}/admin`;

  const githubAuthUrl = 'https://github.com/login/oauth/authorize';
  const clientId = env.GITHUB_CLIENT_ID;
  const state = crypto.randomUUID();

  const cookie = `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax`;
  const redirectUriCookie = `redirect_uri=${encodeURIComponent(redirectUri)}; Path=/; HttpOnly; Secure; SameSite=Lax`;

  const redirectTo = `${githubAuthUrl}?client_id=${clientId}&redirect_uri=${url.origin}/auth/callback&state=${state}`;

  return new Response(null, {
    status: 302,
    headers: {
      'Location': redirectTo,
      'Set-Cookie': [cookie, redirectUriCookie],
    },
  });
}