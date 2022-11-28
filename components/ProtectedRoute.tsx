import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

type Props = { children: ReactNode };

export const ProtectedRoute = ({ children }: Props) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return <>{children}</>;
};
