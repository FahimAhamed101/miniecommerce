import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadImage from "./utils/UploadImage.js";
import productRoutes from "./products/product.route.js";

dotenv.config();

const app = express();

// CORS setup (must come before routes)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

// Body parser (for JSON payloads)
app.use(express.json({ limit: "25mb" }));

// Routes
app.use("/api/products", productRoutes);

// Image upload endpoint
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Mini E-commerce Server is running....");
});

// Database connection
async function main() {
  await mongoose.connect(process.env.DB_URL);
}
main()
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.log(err));

// Server start (single instance)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});