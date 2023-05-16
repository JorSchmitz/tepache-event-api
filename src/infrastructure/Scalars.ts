import { scalarType } from 'nexus';

export const scalars = [
  scalarType({
    name: 'JSON',
    asNexusMethod: 'json',
    description: 'JSON scalar type',
  }),
];
