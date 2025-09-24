import * as build from '../../dist/ssr/index.js';

export async function handler(event) {
  try {
    const { generateHTML } = build;

    if (typeof generateHTML !== 'function') {
      throw new Error('generateHTML is not exported from dist/ssr/index.js');
    }

    // превращаем Netlify event в стандартный Request
    const url = new URL(event.rawUrl);
    const request = new Request(url.toString(), {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    });

    const response = await generateHTML(request, fetch);

    // обратно в Netlify response
    return {
      statusCode: response.status,
      headers: Object.fromEntries(response.headers),
      body: await response.text(),
    };
  } catch (err) {
    console.error('SSR Error:', err);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
}
