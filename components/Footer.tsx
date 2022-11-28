import { Box, Link, Text } from '@primer/react';

export const Footer = () => {
  return (
    <Box
      as="footer"
      bg="header.bg"
      padding={4}
      display="flex"
      justifyContent="space-between"
    >
      <Text color="header.text">
        Powered by <Link href="https://vercel.com/">Vercel</Link>
      </Text>

      <Text color="header.text">
        Develop by <Link href="https://emasuriano.com/">EmaSuriano</Link>
      </Text>
    </Box>
  );
};
