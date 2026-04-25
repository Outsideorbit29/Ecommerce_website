const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  // Electronics
  { name: 'iPhone 15 Pro', price: 999, description: 'The latest iPhone with titanium design.', category: 'Electronics', stock: 50, images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600'] },
  { name: 'Samsung Galaxy Tab S9', price: 799, description: 'Premium Android tablet with S Pen.', category: 'Electronics', stock: 30, images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600'] },
  { name: 'MacBook Air M3', price: 1099, description: 'Supercharged by M3 chip.', category: 'Electronics', stock: 25, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'] },
  
  // Men's Fashion
  { name: 'Slim Fit Denim Jacket', price: 89, description: 'Classic denim jacket for men.', category: 'Men Fashion', stock: 100, images: ['https://images.unsplash.com/photo-1576905333550-9a9972306fd1?w=600'] },
  { name: 'Leather Chelsea Boots', price: 120, description: 'Elegant leather boots.', category: 'Men Fashion', stock: 40, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'] },
  
  // Women's Fashion
  { name: 'Silk Evening Gown', price: 150, description: 'Luxurious silk gown for special occasions.', category: 'Women Fashion', stock: 15, images: ['https://images.unsplash.com/photo-1539109132332-629882140ec1?w=600'] },
  { name: 'Minimalist Tote Bag', price: 65, description: 'Spacious leather tote.', category: 'Women Fashion', stock: 60, images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'] },
  
  // Children's Fashion
  { name: 'Cotton Dino Onesie', price: 35, description: 'Cute and comfy for kids.', category: 'Child Fashion', stock: 200, images: ['https://images.unsplash.com/photo-1519238263530-99bbe197c904?w=600'] },
  { name: 'Kids Waterproof Sneath', price: 45, description: 'Durable sneakers for play.', category: 'Child Fashion', stock: 80, images: ['https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600'] },
];

const seedData = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    await Product.deleteMany({}); // Optional: clear existing
    await Product.insertMany(products);
    console.log('Database Seeded with diverse products!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
