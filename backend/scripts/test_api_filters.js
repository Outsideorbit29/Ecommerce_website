const axios = require('axios');

const testFilters = async () => {
  try {
    const categories = ["Electronics", "Men Fashion", "Women Fashion"];
    for (const cat of categories) {
      const { data } = await axios.get(`http://localhost:5000/api/products?category=${encodeURIComponent(cat)}`);
      console.log(`--- Category: ${cat} ---`);
      console.log(`Count: ${data.length}`);
      data.forEach(p => console.log(` - ${p.name} (${p.category})`));
    }
  } catch (error) {
    console.error('Error fetching filtered products:', error.message);
  }
};

testFilters();
