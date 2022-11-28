import { Box, Button, Link, StyledOcticon, Text } from '@primer/react';
import { MarkGithubIcon } from '@primer/octicons-react';
import { signIn } from 'next-auth/react';

export const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="500px"
      margin="auto"
      borderColor="border.default"
      borderWidth={1}
      borderStyle="solid"
      borderRadius={10}
      marginTop={4}
    >
      <Box marginTop={4}>
        <StyledOcticon icon={MarkGithubIcon} size={80} />
      </Box>
      <Text as="h1">Open Source Dashboard</Text>
      <Text as="p" textAlign="center">
        Quick overview of all your Open Sources projects in Github{' '}
        <span role="img" aria-label="sparkles">
          ✨
        </span>
      </Text>
      <Box my={2}>
        <Button variant="primary" onClick={() => signIn('github')}>
          Log in with Github
        </Button>
      </Box>
      <Text as="p">
        Develop with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        by <Link href="http://emasuriano.com/">Ema Suriano</Link>
      </Text>
    </Box>
  );
};
