const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./src/config/db");
const routes = require("./src/routes");
const tipoPropostaController = require("./src/controllers/tipoPropostaController");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT;

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync models with database (in development only)
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("Models synchronized with database.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// API ROUTES
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Use API routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await testConnection();
  // Ensure proposal types exist when server starts
  await tipoPropostaController.ensureTypesExist();
});
