import { Box } from '@primer/react';
import { useQuery } from 'react-query';
import { Layout, Table } from '../components';
import { server } from '../config';
import { Project } from '../helpers/types';
import { projectSchema } from '../helpers/validators';

const QUERY_KEY = 'projects';

const fetchProjects = (): Promise<Project[]> => {
  return fetch(`${server}/api/projects`)
    .then((res) => res.json())
    .then((data) => Promise.all(data.map((p) => projectSchema.parseAsync(p))));
};

export default function Dashboard() {
  const projectsQuery = useQuery(QUERY_KEY, fetchProjects);

  // Fix SSR
  if (projectsQuery.isLoading) {
    return (
      <Layout>
        <Box maxWidth="1280px" margin="auto" marginTop={4}>
          Loading ...
        </Box>
      </Layout>
    );
  }

  if (projectsQuery.isError) {
    return (
      <Layout>
        <Box maxWidth="1280px" margin="auto" marginTop={4}>
          Failed {projectsQuery.error.toString()}
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box display="flex" margin={4} justifyContent="center" overflowX="auto">
        <Table query={projectsQuery} />
      </Box>
    </Layout>
  );
}
