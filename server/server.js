const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer"); // Add this
const path = require("path"); // Add this
const fs = require("fs"); // Add this
const { sequelize } = require("./src/config/db");
const tipoPropostaController = require("./src/controllers/tipoPropostaController");

// Import route files
const apiRoutes = require("./src/routes/index");
const adminRoutes = require("./src/routes/adminRoutes");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT;

// Initialize Express app
const app = express();
app.use(express.json());

// CORS configuration - specifically allow requests from frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// API Routes
app.use("/api", apiRoutes);

// Admin Routes
app.use("/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.redirect("/admin");
});

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
