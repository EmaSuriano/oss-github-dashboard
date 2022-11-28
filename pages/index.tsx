import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Box, Button, StyledOcticon, Text } from '@primer/react';
import { MarkGithubIcon } from '@primer/octicons-react';
import { signIn } from 'next-auth/react';
import { Layout } from '../components';
import { useRouter } from 'next/router';

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          borderColor="border.default"
          borderWidth={1}
          borderStyle="solid"
          borderRadius={10}
          margin={4}
          padding={4}
          gridGap={2}
        >
          <StyledOcticon icon={MarkGithubIcon} size={80} />
          <Text as="h1" textAlign="center">
            Open Source Dashboard
          </Text>
          <Text as="p" textAlign="center">
            Quick overview of all your Open Sources projects in Github ✨
          </Text>
          <Button variant="primary" onClick={() => signIn('github')}>
            Log in with Github
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
