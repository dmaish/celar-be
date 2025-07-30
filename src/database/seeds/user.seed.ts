import { dataSource } from '../ormconfig';

const seedUsers = async () => {
  await dataSource.initialize();

  // Check if any user exists already 
  const existingUsers = await dataSource.query(`
    SELECT 1 FROM "user" WHERE email = 'psp@example.com' LIMIT 1
  `);

  if (existingUsers.length > 0) {
    console.log('Users already seeded. Skipping...');
    process.exit(0);
  }

  await dataSource.query(`
    INSERT INTO "user" (email, salt, password, role)
    VALUES 
      ('psp@example.com', '$2b$10$ofTow9CvRN6Ph8uerILd4O', 'Psp12345!', 'PSP'),
      ('dev@example.com', '$2b$10$ofTow9CvRN6Ph8uerILd4O', 'Dev12345!', 'DEV')
    ON CONFLICT (email) DO NOTHING;
  `);

  console.log('Seeded users with raw query!');
  process.exit(0);
};

seedUsers().catch((err) => {
  console.error('❌ Error seeding users:', err);
  process.exit(1);
});

