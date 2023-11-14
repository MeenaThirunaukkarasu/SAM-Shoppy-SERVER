// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// async function getProductData() {
//     try {
//       const response = await axios.get(
//         "https://portfolio-eshop-api.onrender.com/api/products"
//       );
//       const allProducts = response.data;
//       allProducts.forEach((product) => {
//         product.availability = 5;
//         product.inStock = true;
//       });
//       const menProduct = allProducts.filter((product) => {
//         return product.categories[0] === "men";
//       });
//       menProduct.forEach((product) => {
//         product.categories = "men";
//         product.size = ["S", "M", "L"];
  
//       });
//       const womenProduct = allProducts.filter((product) => {
//         return product.categories[0] === "women";
//       });
//       womenProduct.forEach((product) => {
//         product.categories = "women";
//         product.size = ["S", "M", "L"];
  
//       });
//       return { womenProduct, menProduct };
//     } catch (error) {
//       console.log("error getting products", error);
//       throw error;
//     }
//   }
  
//   const kidsProduct = [
//     {
//       title: "BornKids Spiderman t-shirts",
//       desc: "100% Cotton, Half Sleeve, Casual",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/61zioeWhWgS._AC_UY1100_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 453,
//       availability: 3,
//       inStock: true,
//     },
  
//     {
//       title: "LEGO Harry Potter boys Pajamas",
//       desc: "65% katoen, 35% polyester, Machinewash, Pull-on",
//       categories: "boys",
//       img: "	https://m.media-amazon.com/imgs/I/71yf9VycFEL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 400,
//       availability: 5,
//       inStock: true,
//     },
  
//     {
//       title: "Pokemon boys Hoodie",
//       desc: "composition80%, Polyester, 20% Cotton,Machine wash, Attract",
//       categories: "boys",
//       img: "	https://m.media-amazon.com/imgs/I/91WXJ1E8L4L._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 953,
//       availability: 0,
//       inStock: false,
//     },
  
//     {
//       title:
//         "Joureker Clothing set, dinosaurs, long sleeves, tops and pants outfits",
//       desc: "Machine wash, Pull on",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/71zi-bFIZyL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 853,
//       availability: 8,
//       inStock: true,
//     },
  
//     {
//       title: "Borlai 2PCS Kids Boy Dinosaur Hooded Tracksuit Set",
//       desc: "Cotton, Hand wash only, Elastic",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/61cgfmJpoFL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 493,
//       availability: 9,
//       inStock: true,
//     },
  
//     {
//       title: "Amissz Baby boys Clothes Set",
//       desc: "Gentleman Long Sleeve Romper Shirt+Suspenders+Bow Tie Festive Baptism Wedding",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/61+OBVtEBuL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 480,
//       availability: 7,
//       inStock: true,
//     },
  
//     {
//       title: "mintgreen Gentleman Suit for Baby boys",
//       desc: "Long Sleeve Shirt, Bow Tie + Waistcoat + Pants",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/71somK+YqXL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 785,
//       availability: 8,
//       inStock: true,
//     },
  
//     {
//       title: "Levi's Kids Lvb Batwing Crewneck Pullover for children",
//       desc: "60% cotton, 40% polyester,Machine wash,Attract",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/61sp+UsW+ZL._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       availability: 4,
//       inStock: true,
//     },
  
//     {
//       title: "Pokemon Jogging - 2-piece set hoodie and training pants",
//       desc: "60% cotton, 40% polyester,Machine wash,Attract",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/410UZK69OjL._AC_SY580_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 875,
//       availability: 20,
//       inStock: true,
//     },
  
//     {
//       title:
//         "Borlai Set of dinosaur clothes for children with long sleeves and long pants",
//       desc: "60% cotton, 40% polyester,Machine wash, Casual.",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/717PyOnRruL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 763,
//       availability: 15,
//       inStock: true,
//     },
  
//     {
//       title: "Paw Patrol Tracksuit for boys",
//       desc: "100% cotton, Machine wash, Pull on",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/71jBZzCaKeL._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 863,
//       availability: 18,
//       inStock: true,
//     },
  
//     {
//       title: "Joules Dale boys Sweatshirt",
//       desc: "100% cotton, Machine wash, Pull on",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/714aNgCrItL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 754,
//       availability: 0,
//       inStock: false,
//     },
  
//     {
//       title: "ALAMing Sweatshirt Pants Clothes Sets",
//       desc: "100% cotton, Machine wash, Pull on",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/61JidkSBZIL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 340,
//       availability: 9,
//       inStock: true,
//     },
  
//     {
//       title:
//         "LQ-ZHUOJIAO boys Spiderman Hoodie Sweatshirt Carnival Halloween Clothes",
//       desc: "100% cotton, Machine wash, Pull on",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/61OtdLdDZNL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 640,
//       availability: 7,
//       inStock: true,
//     },
  
//     {
//       title: "Marvel boys Spiderman T-shirt and Shorts",
//       desc: "100% cotton, Machine wash, Pull on",
//       categories: "boys",
//       img: "https://m.media-amazon.com/imgs/I/812SbzX0leL._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 980,
//       availability: 0,
//       inStock: false,
//     },
//     {
//       title: "Suspender Skirt Outfits Ruffle",
//       desc: "Machine wash, Pull on",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/71rFrdlSsCL._AC_SL1500_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 340,
//       availability: 10,
//       inStock: true,
//     },
//     {
//       title: "BlackButterfly Children 'Audrey' Vintage Daisy 1950s girls Dress",
//       desc: "100% polyester, Hand wash only,Zipper",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/91cSjzC6AmL._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 460,
//       availability: 8,
//       inStock: true,
//     },
//     {
//       title:
//         "Joureker Babykleding voor meisjes, met lange mouwen, ruches, tops met bloemenprint en broek",
//       desc: "100% cotton, Machine wash, Pull on",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/61FkbkfNPtL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 654,
//       availability: 8,
//       inStock: true,
//     },
//     {
//       title:
//         "knemmy Princess Dress Up Clothes Halloween Beauty and Beast Costume for Girl Cosplay Birthday Outfit Yellow",
//       desc: "100% polyester, Hand wash only,Zipper",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/718kj1+X9PL._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 950,
//       availability: 14,
//       inStock: true,
//     },
//     {
//       title: "Little Girl Corduroy Dress",
//       desc: "100% polyester, Hand wash only,Zipper",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/71AfqVp-d6L._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 783,
//       availability: 0,
//       inStock: false,
//     },
//     {
//       title: "Verve Jelly Toddler Baby girls Suspender Skirt Set Long Sleeve",
//       desc: "Machine wash, Pull on",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/717xLXsBT8L._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 652,
//       availability: 15,
//       inStock: true,
//     },
//     {
//       title:
//         "Disney Stitch Hoodie for girls, Cropped Sweatshirt Kids Tracksuit, Stitch Gifts",
//       desc: "65% katoen, 35% polyester, Machinewash, Pull-on",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/71a-D-8ojML._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 450,
//       availability: 9,
//       inStock: true,
//     },
//     {
//       title:
//         "Pink & Gray Tracksuit #Selfie Printing Hood & Bottom Jogging Costume Jackets ",
//       desc: "65% katoen, 35% polyester, Machinewash, Pull-on",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/81xd53ygpML._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 753,
//       availability: 0,
//       inStock: false,
//     },
//     {
//       title: "Peppa Pig Meisjes Overgooierjurk en topset",
//       desc: "65% katoen, 35% polyester, Machinewash, Pull-on",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/81nYfAMmeFL._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 953,
//       availability: 7,
//       inStock: true,
//     },
//     {
//       title: "Girl Cotton Striped Long Sleeve Top Plaid Wool Culottes Suit ",
//       desc: "65% katoen, 35% polyester, Machinewash, Pull-on",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/71l7Zvz7HoL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 853,
//       availability: 8,
//       inStock: true,
//     },
//     {
//       title:
//         "knemmy princess costume for girl Halloween princess dress up clothes",
//       desc: "100% polyester, Hand wash only,Zipper",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/81-wE8M8+WL._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 353,
//       availability: 5,
//       inStock: true,
//     },
//     {
//       title:
//         "Toddler girls Fly Sleeve Star Moon Paillette Princess Dress Dance Party Ruffles",
//       desc: "100% polyester, Hand wash only,Zipper",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/71iTa0KYB+L._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 153,
//       availability: 6,
//       inStock: true,
//     },
//     {
//       title: "Arshiner Dress girls party dress elegant short sleeve summer dress",
//       desc: "100% polyester, Hand wash only,Zipper",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/61yGuwfqayL._AC_SY879_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 553,
//       availability: 1,
//       inStock: true,
//     },
//     {
//       title: "girls Princess Dress Party Dress",
//       desc: "100% polyester, Hand wash only,Zipper",
//       categories: "girls",
//       img: "https://m.media-amazon.com/imgs/I/61Ub--LaqhL._AC_SX679_.jpg",
//       size: [
//         "3 - 4",
//         "4 - 5",
//         "5 - 6",
//         "6 - 7",
//         "7 - 8",
//         "8 - 9",
//         "9 - 10",
//         "10 - 11",
//         "11 - 12",
//         "12 - 13",
//         "13 - 14",
//       ],
//       price: 653,
//       availability: 6,
//       inStock: true,
//     },
//   ];
  
//   router.get("/kids/create", (req, res, next) => {
//     Product.create(kidsProduct)
//       .then((createdProduct) => {
//         // console.log(createdProduct)
//         res.json(createdProduct);
//       })
//       .catch((error) => {
//         console.log("error creating kids product", error);
//       });
//   });
  
//   router.get("/men/create",async (req, res, next) => {
//     try{
//     const { menProduct }= await getProductData();
//       Product.create(menProduct)
//         .then((createdProduct) => {
//           res.json(createdProduct);
//         })
//         .catch((error) => {
//           console.log("error creating mens product", error);
//         });
//     }
//     catch(error){
// console.log("error getting data from api",error)
//     }
//     })
   
//     router.get("/women/create",async(req,res,next) => {
//         try{
//             const{ womenProduct }=await getProductData();
//             Product.create(womenProduct)
//             .then((createdProduct)=>{
//                 res.json(createdProduct);
//             })
//             .catch((error)=>{
//                 console.log("error creating womens product", error);
//             });
//         }
//         catch(error){
//             console.log("error  getting data from api",error)
//         }
//     });
    
    

// module.exports = router;
