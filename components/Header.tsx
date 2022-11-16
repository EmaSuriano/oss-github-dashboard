import {
  Header as PrimerHeader,
  ActionMenu,
  ActionList,
  StyledOcticon,
  Avatar,
} from '@primer/react';
import { MarkGithubIcon } from '@primer/octicons-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const Header = () => {
  const { status, data } = useSession();
  const router = useRouter();

  const onSignOutClicked = async () => {
    await signOut();
    await router.push('/');
  };

  return (
    <>
      <PrimerHeader>
        <PrimerHeader.Item>
          <PrimerHeader.Link href="/">
            <StyledOcticon icon={MarkGithubIcon} size={32} sx={{ mr: 2 }} />
            <span>Open Source Dashboard</span>
          </PrimerHeader.Link>
        </PrimerHeader.Item>
        <PrimerHeader.Item full />

        <PrimerHeader.Item>
          {status === 'authenticated' ? (
            <ActionMenu>
              <ActionMenu.Button
                variant="invisible"
                sx={{
                  backgroundColor: 'inherit !important',
                  color: 'rgba(255,255,255,1)',
                  '&:hover, &:active, &:focus': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
              >
                <Avatar src={data.user.image} size={20} square alt="@octocat" />
              </ActionMenu.Button>

              <ActionMenu.Overlay>
                <ActionList>
                  <ActionList.Group title="Signed in as">
                    <ActionList.Item>{data.user.name}</ActionList.Item>
                  </ActionList.Group>
                  <ActionList.Divider />
                  <ActionList.LinkItem href="/dashboard">
                    Dashboard
                  </ActionList.LinkItem>
                  <ActionList.LinkItem href="/config">
                    Config
                  </ActionList.LinkItem>
                  <ActionList.Divider />
                  <ActionList.Item variant="danger" onClick={onSignOutClicked}>
                    Sign out
                  </ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          ) : (
            <PrimerHeader.Link onClick={() => signIn()}>
              Log in
            </PrimerHeader.Link>
          )}
        </PrimerHeader.Item>
      </PrimerHeader>
    </>
  );
};
