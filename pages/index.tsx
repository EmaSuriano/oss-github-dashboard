import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Box } from '@primer/react';
import { Layout, Login, Table } from '../components';
import { Project } from '../helpers/types';

export default function IndexPage() {
  const { status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/projects');
      const json = await res.json();
      if (json) {
        setProjects(json);
      }
    };
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  return (
    <Layout>
      {status === 'authenticated' ? (
        <Box maxWidth="1280px" margin="auto" marginTop={4}>
          <Table data={projects} status="success" />
        </Box>
      ) : (
        <Login />
      )}
    </Layout>
  );
}
