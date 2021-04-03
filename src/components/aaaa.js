import SnackBar from "./SnackBar";

const [snackbaralert, setSnackbaralert] = useState({
  show: false,
  msg: "",
  type: "",
});

const handleSnackbarAlert = (type, msg) => {
  setSnackbaralert({
    show: true,
    type: type,
    msg: msg,
  });
};

handleSnackbarAlert = { handleSnackbarAlert };

{
  snackbaralert.show ? (
    <SnackBar
      snackbaralert={snackbaralert}
      setSnackbaralert={setSnackbaralert}
    />
  ) : null;
}

import ConfirmBox from "./ConfirmBox";

const [confirmbox, setConfirmbox] = useState({
  show: false,
  title: "",
  text: "",
  ok: "",
  no: "",
});

const handleDeleteAccountConfirm = () => {
  setConfirmbox({
    show: true,
    title: "Delete account",
    text: "Are you sure?",
    ok: "Continue",
    no: "cancel",
  });
};

const handleConfirmBoxConfirm = () => {
  setConfirmbox({
    ...confirmbox,
    show: false,
  });
  if (confirmbox.title === "Delete account") {
    handleDeleteAccount();
  }
  if (confirmbox.title === "Reset password") {
    handleResetPassword();
  }
};

{
  confirmbox.show ? (
    <ConfirmBox
      confirmbox={confirmbox}
      setConfirmbox={setConfirmbox}
      handleConfirmBoxConfirm={handleConfirmBoxConfirm}
    />
  ) : null;
}

// images: ["", "", "", "", "", "", "", "", ""],

// db.collection("products")
//   .doc("productsDoc")
//   .set({
//     productsList: [
//       {
//         category: "electronics",
//         categoryItems: [
//           {
//             subcategory: "mobiles",
//             subcategoryItems: [
//               {
//                 id: "electronics_mobile_1",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg",
//                 title: "Apple iPhone 12 (128GB) - Blue",
//                 searchName: "Apple iPhone 12",
//                 rating: 4,
//                 reviews: 614,
//                 price: 84889,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "apple",
//               },
//               {
//                 id: "electronics_mobile_2",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/917nPCOw9-L._SX342_.jpg",
//                 title:
//                   "Samsung Galaxy S21 Ultra 5G (Phantom Black, 16GB, 512GB Storage)",
//                 searchName: "Samsung Galaxy S21 Ultra 5G",
//                 rating: 4,
//                 reviews: 172,
//                 price: 116999,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "samsung",
//               },
//               {
//                 id: "electronics_mobile_3",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/61YSMhOd5EL._SL1500_.jpg",
//                 title: "OnePlus 8 Pro (Onyx Black 12GB RAM+256GB Storage)",
//                 searchName: "OnePlus 8 Pro",
//                 rating: 4,
//                 reviews: 864,
//                 price: 59999,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "oneplus",
//               },
//               {
//                 id: "electronics_mobile_4",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/61RdG7c%2BVUL._SL1000_.jpg",
//                 title: "OnePlus Nord 5G (Blue Marble, 12GB RAM, 256GB Storage)",
//                 searchName: "OnePlus Nord 5G",
//                 rating: 4,
//                 reviews: 36600,
//                 price: 29999,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "oneplus",
//               },
//               {
//                 id: "electronics_mobile_5",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/81bz0g2odDL._SL1500_.jpg",
//                 title:
//                   "OPPO Reno5 Pro 5G (Starry Black, 8GB RAM, 128GB Storage)",
//                 searchName: "OPPO Reno5 Pro 5G",
//                 rating: 4,
//                 reviews: 114,
//                 price: 35990,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "oppo",
//               },
//               {
//                 id: "electronics_mobile_6",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/71CuwgwCQdL._SL1500_.jpg",
//                 title: "OnePlus 8T 5G (Lunar Silver 12GB RAM, 256GB Storage)",
//                 searchName: "OnePlus 8T 5G",
//                 rating: 4,
//                 reviews: 7264,
//                 price: 45999,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "oneplus",
//               },
//               {
//                 id: "electronics_mobile_7",
//                 image:
//                   "https://images-eu.ssl-images-amazon.com/images/I/41%2BxWzgV8jL._SX300_SY300_QL70_FMwebp_.jpg",
//                 title:
//                   "Samsung Galaxy M31 (Ocean Blue, 6GB RAM, 128GB Storage)",
//                 searchName: "Samsung Galaxy M31",
//                 rating: 4,
//                 reviews: 135484,
//                 price: 16499,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "samsung",
//               },
//               {
//                 id: "electronics_mobile_8",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/714x-fA6-RL._SL1500_.jpg",
//                 title:
//                   "Mi 10i 5G (Midnight Black, 8GB RAM, 128GB Storage) - 108MP Quad Camera | Snapdragon 750G Processor",
//                 searchName: "Mi 10i 5G",
//                 rating: 4,
//                 reviews: 3448,
//                 price: 23999,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "mi",
//               },
//               {
//                 id: "electronics_mobile_9",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/71AUfpuoOvL._SL1500_.jpg",
//                 title:
//                   "Samsung Galaxy S20 FE (Cloud Mint, 8GB RAM, 128GB Storage)",
//                 searchName: "Samsung Galaxy S20 FE",
//                 rating: 3,
//                 reviews: 197,
//                 price: 37800,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "samsung",
//               },
//               {
//                 id: "electronics_mobile_10",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/51Ud%2B-WXBZL._SL1000_.jpg",
//                 title: "ASUS ROG Phone 3, 8GB RAM,128 Internal Memory",
//                 searchName: "ASUS ROG Phone 3",
//                 rating: 4,
//                 reviews: 324,
//                 price: 49999,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "asus",
//               },
//               {
//                 id: "electronics_mobile_11",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/71sNNCTfMuL._SL1500_.jpg",
//                 title: "Apple iPhone 12 Mini (128GB) - Blue",
//                 searchName: "Apple iPhone 12 Mini",
//                 rating: 5,
//                 reviews: 1650,
//                 price: 74900,
//                 category: "electronics",
//                 subcategory: "mobiles",
//                 brand: "apple",
//               },
//             ],
//           },
//           {
//             subcategory: "laptops",
//             subcategoryItems: [
//               {
//                 id: "electronics_laptop_1",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/81w4VMSLLzL._SL1500_.jpg",
//                 title:
//                   "HP 14 Laptop (Ryzen 5 3500U/8GB/1TB HDD + 256GB SSD/Win 10/Microsoft Office 2019/Radeon Vega 8 Graphics), DK0093AU",
//                 searchName: "HP 14 Laptop",
//                 rating: 4,
//                 reviews: 312,
//                 price: 44990,
//                 category: "electronics",
//                 subcategory: "laptops",
//                 brand: "hp",
//               },
//               {
//                 id: "electronics_laptop_2",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/718ETwvLVOL._SX679_.jpg",
//                 title:
//                   "Microsoft Surface Laptop Go 10th Gen Intel Core™ i5-1035G1 12.4 inch Touchscreen Laptop (8GB/128GB SSD/Windows 10 Home in S Mode/Intel UHD Graphics/Platinum/1.110 kg), THH-00023",
//                 searchName: "Microsoft Surface Go",
//                 rating: 4,
//                 reviews: 6,
//                 price: 69990,
//                 category: "electronics",
//                 subcategory: "laptops",
//                 brand: "microsoft",
//               },
//               {
//                 id: "electronics_laptop_3",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/71Dv5BtTh8L._SL1500_.jpg",
//                 title:
//                   "LG Gram 10th Gen Intel Core i5-1035G7 14-inch IPS Full HD (1920X1080) Thin and Light Laptop (8GB/256GB SSD/Windows 10 64-bit/Dark Silver/999gms), 14Z90N",
//                 searchName: "LG Gram",
//                 rating: 4,
//                 reviews: 14,
//                 price: 67990,
//                 category: "electronics",
//                 subcategory: "laptops",
//                 brand: "lg",
//               },
//               {
//                 id: "electronics_laptop_4",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/51CEknIIHcL._SL1080_.jpg",
//                 title:
//                   "Dell Vostro 3405 14 FHD AG Display Laptop (Ryzen-5 3500U / 8GB / 512 SSD / Vega Graphics / Win 10 + Office H&S/ Dune Color) D552122WIN9DE",
//                 searchName: "Dell Vostro",
//                 rating: 5,
//                 reviews: 35,
//                 price: 46190,
//                 category: "electronics",
//                 subcategory: "laptops",
//                 brand: "dell",
//               },
//               {
//                 id: "electronics_laptop_5",
//                 image:
//                   "https://images-na.ssl-images-amazon.com/images/I/71jG%2Be7roXL._SL1500_.jpg",
//                 title:
//                   "Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 512GB SSD) - Space Grey (Latest Model)",
//                 searchName: "Apple MacBook Air M1",
//                 rating: 5,
//                 reviews: 68,
//                 price: 117900,
//                 category: "electronics",
//                 subcategory: "laptops",
//                 brand: "apple",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   });
