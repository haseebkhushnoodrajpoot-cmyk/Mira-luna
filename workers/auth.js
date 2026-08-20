// workers/auth.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle the OAuth callback
    if (path === '/auth') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Missing code', { status: 400 });
      }

      // Exchange code for access token
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

      // Redirect back to the admin page with the token
      const adminUrl = `https://mira-luna.pages.dev/admin/#/auth?access_token=${tokenData.access_token}`;
      return Response.redirect(adminUrl, 302);
    }

    // Default response
    return new Response('Not found', { status: 404 });
  }
};