// seeders/initialUsers.js
import { User } from "../models/user.model.js";

export const seedUsers = async () => {
  await User.bulkCreate([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
  ]);
  console.log("✅ Users seeded");
};

// Call this in your app.js after sync
// (Add to app.js)
sequelize.sync({ alter: true })
  .then(async () => {
    console.log("✅ User table synced");
    await seedUsers(); // Seed initial data
  })