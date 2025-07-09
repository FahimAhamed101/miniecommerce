import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadImage from "./utils/UploadImage.js";
import productRoutes from "./products/product.route.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: ['http://localhost:5173','https://miniecommercefrontend.vercel.app'],
  credentials: true
}));


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


async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000, 
      maxPoolSize: 10, 
      retryWrites: true,
      w: 'majority'
    });
    console.log("Successfully connected to MongoDB.");
    
  
    mongoose.set('bufferTimeoutMS', 30000);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}


connectDB();


app.use("/api/products", productRoutes);


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
app.get("/", (req, res) => {
  res.send("Mini E-commerce Server is running....");
});

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    dbState: mongoose.connection.readyState,
    timestamp: new Date()
  });
});


app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ 
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server and MongoDB connection closed');
      process.exit(0);
    });
  });
});