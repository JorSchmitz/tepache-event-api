import { scalarType } from 'nexus'

export const scalars = [
  scalarType({
    name: 'JSON',
    asNexusMethod: 'json',
    description: 'JSON scalar type',
  }),
]

import { asNexusMethod } from 'nexus'
import { GraphQLDateTime } from 'graphql-scalars'

export const GQLDate = asNexusMethod(GraphQLDateTime, 'dateTime')
