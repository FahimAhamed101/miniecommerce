import mongoose from "mongoose";
import dotenv from "dotenv";
import Products from "./products.model.js";


dotenv.config();



const seedProducts = async () => {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
   
    
      const products = [
        {
          "id": 1,
          "name": "Leather Handbag",
          "category": "accessories",
          "description": "Stylish leather handbag with ample storage space.",
          "price": 79.99,
          "oldPrice": 99.99,
          "image": "https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "black",
      
        },
        {
          "id": 2,
          "name": "Evening Gown",
          "category": "dress",
          "description": "Elegant evening gown for special occasions.",
          "price": 149.99,
          "oldPrice": 199.99,
          "image": "https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "red",
        
        },
        {
          "id": 3,
          "name": "Gold Necklace",
          "category": "jewellery",
          "description": "Exquisite gold necklace with intricate design.",
          "price": 199.99,
          "image": "https://images.unsplash.com/photo-1631097969294-c38afba59496?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "gold",
        
        },
        {
          "id": 4,
          "name": "Matte Lipstick",
          "category": "cosmetics",
          "description": "Long-lasting matte lipstick in various shades.",
          "price": 19.99,
          "image": "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "red",
       
        },
        {
          "id": 5,
          "name": "Silk Scarf",
          "category": "accessories",
          "description": "Luxurious silk scarf with vibrant colors.",
          "price": 29.99,
          "oldPrice": 39.99,
          "image": "https://images.unsplash.com/photo-1485527691629-8e370684924c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "blue",
      
        },
        {
          "id": 6,
          "name": "Cocktail Dress",
          "category": "dress",
          "description": "Chic cocktail dress for parties and events.",
          "price": 89.99,
          "image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "black",
         
        },
        {
          "id": 7,
          "name": "Diamond Earrings",
          "category": "jewellery",
          "description": "Sparkling diamond earrings that add elegance to any outfit.",
          "price": 299.99,
          "oldPrice": 349.99,
          "image": "https://images.unsplash.com/photo-1587467442586-7bcc51828a10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "silver",
        
        },
        {
          "id": 8,
          "name": "Foundation",
          "category": "cosmetics",
          "description": "High-coverage foundation for a flawless finish.",
          "price": 39.99,
          "image": "https://images.unsplash.com/photo-1599733589046-10c005739ef9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "beige",
         
        },
        {
          "id": 9,
          "name": "Sunglasses",
          "category": "accessories",
          "description": "Trendy sunglasses with UV protection.",
          "price": 49.99,
          "image": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "black",
         
       
        },
        {
          "id": 10,
          "name": "Casual Pants",
          "category": "dress",
          "description": "Comfortable maxi dress for casual outings.",
          "price": 59.99,
          "oldPrice": 79.99,
          "image": "https://plus.unsplash.com/premium_photo-1664298355914-bc65d2c9af64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "color": "green",
       
        }
      ]
    


      await Products.deleteMany();
      console.log('Products deleted');
      
      await Products.insertMany(products);
      console.log('Products added');
  
      process.exit();
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  };
  
  seedProducts();