import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box } from '@primer/react';

type Props = { children: ReactNode };

export const Layout = ({ children }: Props) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box as="main" flexGrow={2}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
