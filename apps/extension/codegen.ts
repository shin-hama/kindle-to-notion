import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../api/src/graphql/schema.gql',
  documents: ['./**/*.ts'],
  generates: {
    './gql/': {
      preset: 'client',
    },
  },
}

export default config
