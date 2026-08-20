// /api/auth.js
export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace(/^\/api\/auth/, '');

  // --- /api/auth (redirect to GitHub) ---
  if (req.method === 'GET' && path === '') {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).send('Missing GITHUB_CLIENT_ID');
    }
    const githubUrl = new URL('https://github.com/login/oauth/authorize');
    githubUrl.searchParams.set('client_id', clientId);
    githubUrl.searchParams.set('redirect_uri', `${req.headers.origin}/api/auth/callback`);
    githubUrl.searchParams.set('state', crypto.randomUUID());
    return res.redirect(githubUrl.toString());
  }

  // --- /api/auth/callback (exchange code for token) ---
  if (req.method === 'GET' && path === '/callback') {
    const code = url.searchParams.get('code');
    if (!code) return res.status(400).send('Missing code');

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) return res.status(400).send('No token');

    const adminUrl = new URL('/admin', req.headers.origin);
    adminUrl.searchParams.set('access_token', accessToken);
    return res.redirect(adminUrl.toString());
  }

  res.status(404).send('Not found');
}