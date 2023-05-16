import { objectType } from 'nexus';

export const user = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('userId');
    t.nullable.string('email');
    t.nullable.string('name');
    t.nullable.string('lastName');
    t.list.nullable.string('roles');
  },
});
