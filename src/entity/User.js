const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstname: {
      type: 'varchar',
    },
    lastname: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    phone: {
      type: 'varchar',
      unique: true,
      nullable: true,
    },
    password: {
      type: 'varchar',
    },
    addedAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
  role: {
    type: 'many-to-one',
    target: 'Role',
    joinColumn: true,
  },
});
