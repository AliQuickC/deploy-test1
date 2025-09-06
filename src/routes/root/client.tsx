'use client';

import { isRouteErrorResponse, useRouteError } from 'react-router';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Provider } from 'react-redux';
import store from '../../redux/store';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/vnd.microsoft.icon"
          href="/ikar.ico"
        ></link>
        <link rel="icon" type="image/png" href="/ikar.png" />
      </head>
      <body>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = status === 404 ? 'Page not found.' : error.statusText || message;
  }

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{status}</h1>
        <p>{message}</p>
      </article>
    </main>
  );
}
