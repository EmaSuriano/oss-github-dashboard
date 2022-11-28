import { SSRProvider } from '@primer/react';
import type { ReactNode } from 'react';
import { Header } from './Header';

type Props = { children: ReactNode };

export const Layout = ({ children }: Props) => {
  return (
    <SSRProvider>
      <Header />
      <main>{children}</main>
    </SSRProvider>
  );
};
