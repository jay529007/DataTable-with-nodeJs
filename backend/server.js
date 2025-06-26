import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // only allow this URL
  })
);

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection failed:", err));

// Sync the model (create table if not exists)
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ User table synced"))
  .catch((err) => console.error("❌ Sync failed:", err));

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to API go to /api/users");
});

//data route
app.use("/api", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
