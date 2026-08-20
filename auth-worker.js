export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/auth') {
      const clientId = env.GITHUB_CLIENT_ID;
      if (!clientId) return new Response('Missing GITHUB_CLIENT_ID', { status: 500 });
      const githubUrl = new URL('https://github.com/login/oauth/authorize');
      githubUrl.searchParams.set('client_id', clientId);
      githubUrl.searchParams.set('redirect_uri', 'https://mira-luna-auth.miralunajewels.workers.dev/auth/callback');
      githubUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(githubUrl.toString(), 302);
    }

    if (path === '/auth/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;
      if (!accessToken) return new Response('No token', { status: 400 });
      const adminUrl = new URL('https://mira-luna.pages.dev/admin');
      adminUrl.searchParams.set('access_token', accessToken);
      return Response.redirect(adminUrl.toString(), 302);
    }

    return new Response('Not found', { status: 404 });
  }
};