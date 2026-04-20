// const products = [

//   { name: "iPhone 15", price: 80000, category: "Phones", img: "/images/iphone.jpg" },
//   { name: "Samsung Galaxy S23", price: 70000, category: "Phones", img: "/images/s23.webp" },
//   { name: "OnePlus 12", price: 65000, category: "Phones", img: "/images/oneplus.jpg" },
//   { name: "Realme GT Neo", price: 28000, category: "Phones", img: "/images/realme.jpg" },

//   { name: "Nike Air Shoes", price: 6500, category: "Shoes", img: "/images/nike.jpg" },
//   { name: "Adidas Ultraboost", price: 7200, category: "Shoes", img: "/images/addidas.jpg" },
//   { name: "Puma Running Shoes", price: 5400, category: "Shoes", img: "/images/puma.jpg" },
//   { name: "Beta Sneakers", price: 4800, category: "Shoes", img: "/images/beta.jpg" },

//   { name: "Titan Watch", price: 3200, category: "Watches", img: "/images/titan.jpg" },
//   { name: "Fastrack Watch", price: 2100, category: "Watches", img: "/images/fastrack.webp" },
//   { name: "Casio Digital Watch", price: 2800, category: "Watches", img: "/images/casio.avif" },

//   { name: "Men Shirt", price: 1200, category: "Clothes", img: "/images/mentshirt.jpg" },
//   { name: "Women Jeans", price: 2200, category: "Clothes", img: "/images/wjeans.avif" },
//   { name: "Leather Jacket", price: 4500, category: "Clothes", img: "/images/leatherjac.webp" },
//   { name: "Hoodie Sweatshirt", price: 1800, category: "Clothes", img: "/images/hoodie.jpg" }

// ];

// export default products;
// const phones=[
//   { name: "iPhone 15", price: 80000, category: "Phones", img: "/images/iphone.jpg" },
//   { name: "Samsung Galaxy S23", price: 70000, category: "Phones", img: "/images/s23.webp" },
//   { name: "OnePlus 12", price: 65000, category: "Phones", img: "/images/oneplus.jpg" },
//   { name: "Realme GT Neo", price: 28000, category: "Phones", img: "/images/realme.jpg" },
// ];
// const shoes =[
//     { name: "Nike Air Shoes", price: 6500, category: "Shoes", img: "/images/nike.jpg" },
//   { name: "Adidas Ultraboost", price: 7200, category: "Shoes", img: "/images/addidas.jpg" },
//   { name: "Puma Running Shoes", price: 5400, category: "Shoes", img: "/images/puma.jpg" },
//   { name: "Beta Sneakers", price: 4800, category: "Shoes", img: "/images/beta.jpg" },
// ];
// const watches=[
//       { name: "Titan Watch", price: 3200, category: "Watches", img: "/images/titan.jpg" },
//   { name: "Fastrack Watch", price: 2100, category: "Watches", img: "/images/fastrack.webp" },
//   { name: "Casio Digital Watch", price: 2800, category: "Watches", img: "/images/casio.avif" },
// ];
// const clothes=[
//     { name: "Men Shirt", price: 1200, category: "Clothes", img: "/images/mentshirt.jpg" },
//   { name: "Women Jeans", price: 2200, category: "Clothes", img: "/images/wjeans.avif" },
//   { name: "Leather Jacket", price: 4500, category: "Clothes", img: "/images/leatherjac.webp" },
//   { name: "Hoodie Sweatshirt", price: 1800, category: "Clothes", img: "/images/hoodie.jpg" }

// ];

// export {products,phones,shoes,watches,clothes}
const products = [
  { name: "iPhone 15", price: 80000, category: "Phones", img: "/images/iphone.jpg" },
  { name: "OnePlus 12", price: 65000, category: "Phones", img: "/images/oneplus.jpg" },
  { name: "Realme GT", price: 35000, category: "Phones", img: "/images/realme.jpg" },

  { name: "Nike Shoes", price: 5000, category: "Shoes", img: "/images/nike.jpg" },
  { name: "Adidas Shoes", price: 4500, category: "Shoes", img: "/images/addidas.jpg" },
  { name: "Puma Shoes", price: 4200, category: "Shoes", img: "/images/puma.jpg" },

  { name: "Casio Watch", price: 3000, category: "Watches", img: "/images/casio.avif" },
  { name: "Titan Watch", price: 4500, category: "Watches", img: "/images/titan.jpg" },
  { name: "Fastrack Watch", price: 2500, category: "Watches", img: "/images/fastrack.webp" },

  { name: "Men Shirt", price: 1200, category: "Clothes", img: "/images/mentshirt.jpg" },
  { name: "Hoodie", price: 2000, category: "Clothes", img: "/images/hoodie.jpg" },
  { name: "Jeans", price: 1800, category: "Clothes", img: "/images/wjeans.avif" }
];

const phones = products.filter(p => p.category === "Phones");
const shoes = products.filter(p => p.category === "Shoes");
const watches = products.filter(p => p.category === "Watches");
const clothes = products.filter(p => p.category === "Clothes");

export { products, phones, shoes, watches,clothes  };