import { Outlet } from 'react-router';

import { Layout as ClientLayout } from './client';
import './styles.sass';
import './app.sass';
import { fetchUsers } from './server-function';

export { ErrorBoundary } from './client';

export async function Layout({ children }: { children: React.ReactNode }) {
  const users = await fetchUsers();
  console.log('Fetched users: ', users);

  return <ClientLayout>{children}</ClientLayout>;
}

export default function Component() {
  return (
    <>
      <Outlet />
    </>
  );
}
