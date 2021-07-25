module.exports.homeView = (req, res) => {
  let productImg = "download.jpg";
  let products = [
    {
      id: 1,
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productImg}`,
    },
    {
      id: 2,
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productImg}`,
    },
    {
      id: 3,
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productImg}`,
    },
    {
      id: 4,
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productImg}`,
    },
    {
      id: 5,
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productImg}`,
    },

    {
      id: 6,
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productImg}`,
    },
    {
      id: 7,
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productImg}`,
    },
  ];
  res.status(200).render("home", { title: "home Page", product: products });
};
