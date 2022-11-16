// This is an example of how to read a JSON Web Token from an API route
import { getToken, JWT } from 'next-auth/jwt';
import { graphql } from '@octokit/graphql';

import type { NextApiRequest, NextApiResponse } from 'next';
import { settingsSchema } from '../../helpers/validators';
import getConfig from 'next/config';

const PROJECT_FILE_NAME = 'oss-projects.json';

// Explorer --> https://docs.github.com/en/graphql/overview/explorer

export const getSettings = async (token: JWT) => {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${token.accessToken}`,
    },
  });

  const gistsQuery = await graphqlWithAuth(`
    {
      viewer {
        gists(first: 100) {
          nodes {
            name
            files {
              name
            }
          }
        }
      }
    }
  `);

  const gist = gistsQuery.viewer.gists.nodes.find(({ files }) =>
    files.find(({ name }) => name === PROJECT_FILE_NAME),
  );

  if (!gist) {
    throw new Error('Config file not found');
  }

  const gistQuery = await graphqlWithAuth(
    `query($name: String!) {
      viewer {
        gist(name: $name) {
          files {
            name
            text
          }
        }
      }
    }`,
    { name: gist?.name },
  );

  const gistContent = gistQuery.viewer.gist.files.find(
    (file) => file.name === PROJECT_FILE_NAME,
  ).text;

  return settingsSchema.parseAsync(JSON.parse(gistContent));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = await getToken({ req });
  try {
    const settings = await getSettings(token);
    res.send(JSON.stringify(settings, null, 2));
  } catch (err) {
    res.status(500).send(err.text);
  }
}
