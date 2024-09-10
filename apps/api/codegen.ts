import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [process.env.GRAPHQL_SCHEMA_URL]: {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        apiKey: process.env.SUPABASE_ANON_KEY,
      },
    },
  },
  documents: 'src/**/*.ts',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-operations'],
    },
  },
};

export default config;
