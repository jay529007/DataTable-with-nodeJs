// ./scripts/seed.js
import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";
import sequelize from "../config/db.js";
// import dotenv from "dotenv";

// dotenv.config();
const TOTAL_USERS = 10;
async function seedUsers(count = TOTAL_USERS) {
  try {
    await sequelize.sync(); // ensure DB + table exists

    const users = [];

    for (let i = 0; i < count; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 65 }),
      });
    }

    await User.bulkCreate(users);
    console.log(`${count} users created successfully.`);
  } catch (err) {
    console.error("Error while seeding users:", err);
  } finally {
    await sequelize.close();
  }
}

seedUsers();
