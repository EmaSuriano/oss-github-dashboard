import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, BaseStyles } from '@primer/react';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider>
      <BaseStyles>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}
