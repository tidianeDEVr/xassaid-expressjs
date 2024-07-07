const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "CategoryAudio",
  tableName: "categories_audio",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    slug: {
      type: "varchar",
      unique: true,
    },
    title: {
      type: "varchar",
      unique: true,
    },
    type: {
      type: "varchar",
    },
    addedAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});
