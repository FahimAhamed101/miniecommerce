import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadImage from "./utils/UploadImage.js";
import productRoutes from "./products/product.route.js";

dotenv.config();

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Improved body parser with better error handling
app.use(express.json({ 
  limit: "25mb",
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      res.status(400).json({ error: "Invalid JSON payload" });
    }
  }
}));

// Database connection with robust configuration
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout for initial connection
      socketTimeoutMS: 45000, // 45 seconds timeout for queries
      maxPoolSize: 10, // Maximum number of connections in pool
      retryWrites: true,
      w: 'majority'
    });
    console.log("Successfully connected to MongoDB.");
    
    // Set global query timeout
    mongoose.set('bufferTimeoutMS', 30000);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  }
}

// Connect to database before starting server
connectDB();

// Routes
app.use("/api/products", productRoutes);

// Enhanced image upload with error handling
app.post("/uploadImage", async (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ error: "No image provided" });
    }
    const url = await uploadImage(req.body.image);
    res.json({ url });
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    dbState: mongoose.connection.readyState,
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ 
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server configuration
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server and MongoDB connection closed');
      process.exit(0);
    });
  });
});