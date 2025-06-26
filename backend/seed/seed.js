// ./scripts/seed.js
import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";
import sequelize from "../config/db.js";

const TOTAL_USERS = 10;

// function of seeding Users using faker
(async (count = TOTAL_USERS) => {
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
})();
