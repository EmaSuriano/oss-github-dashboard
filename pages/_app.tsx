import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, BaseStyles, SSRProvider } from '@primer/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

const queryClient = new QueryClient();

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SSRProvider>
        <ThemeProvider colorMode="auto" preventSSRMismatch>
          <BaseStyles>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </BaseStyles>
        </ThemeProvider>
      </SSRProvider>
    </QueryClientProvider>
  );
}
