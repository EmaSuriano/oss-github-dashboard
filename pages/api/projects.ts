// This is an example of how to read a JSON Web Token from an API route
import { getToken, JWT } from 'next-auth/jwt';
import { graphql } from '@octokit/graphql';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSettings } from './settings';
import { server } from '../../config';
import { projectSchema } from '../../helpers/validators';

const PROJECT_FILE_NAME = 'oss-projects.json';

// Explorer --> https://docs.github.com/en/graphql/overview/explorer

export const getProject = async (token: JWT, fullName: string) => {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${token.accessToken}`,
    },
  });

  const [owner, name] = fullName.split('/');

  const projectQuery = await graphqlWithAuth<any>(
    `query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        id
        url
        name
        pullRequests(first: 1, states:OPEN){
          totalCount
        }
        vulnerabilityAlerts(first: 1) {
          totalCount
        }
        issues(first: 1, states:OPEN) {
          totalCount
        }
        stargazers(last:3) {
          totalCount
          nodes {
            id
            name
            avatarUrl
          }
        }
      }
    }`,
    { owner, name },
  );

  return projectSchema.parseAsync(projectQuery.repository);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = await getToken({ req });
  const config = await getSettings(token);
  const projects = await Promise.all(
    config.projects.map((project) => getProject(token, project)),
  );

  res.send(JSON.stringify(projects, null, 2));
}
