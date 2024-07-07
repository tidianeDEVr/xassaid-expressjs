const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Audio",
  tableName: "audios",
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
    pathToFile: {
      type: "varchar",
      unique: true,
    },
    coverImagePath: {
      type: "varchar",
    },
    addedAt: {
      type: "timestamp",
      createDate: true,
    },
    isFeatured: {
      type: "boolean",
    },
  },
});
