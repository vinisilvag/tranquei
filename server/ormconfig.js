module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: process.env.TYPEORM_LOGGING === 'true',
  extra: {
    ssl: process.env.NODE_ENV === 'development' ? false : {
      rejectUnauthorized: false
    }
  },
  entities: [
    process.env.TYPEORM_ENTITIES,
  ],
  migrations: [
    process.env.TYPEORM_MIGRATIONS,
  ],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};
