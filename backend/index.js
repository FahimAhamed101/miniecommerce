import express from "express"; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config()

const app = express()
const port = process.env.PORT || 5000;
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true   //  credentials releted joto jinish ase seta jate kaj kore example token
  })
)
app.use(express.json({ limit: "25mb" }));


async function main() {
    await mongoose.connect(process.env.DB_URL);
      
    }
    main()
    .then(() => console.log(" succesfully connected."))
    .catch((err) => console.log(err));
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

app.get("/", (req, res) => {
    res.send("Mini E-commerce Server is running....");
  });


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });