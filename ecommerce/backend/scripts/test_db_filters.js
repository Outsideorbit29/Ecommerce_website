const mongoose = require('mongoose');
const Product = require('../models/Product');

const testFilters = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    const categories = ["Electronics", "Men Fashion", "Women Fashion"];
    for (const cat of categories) {
      const products = await Product.find({ category: cat });
      console.log(`--- Category: ${cat} ---`);
      console.log(`Count: ${products.length}`);
      products.forEach(p => console.log(` - ${p.name} (${p.category})`));
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

testFilters();
