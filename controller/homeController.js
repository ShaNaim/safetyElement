module.exports.homeView = (req, res) => {
  let productId = "download.jpg";
  let products = [
    {
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productId}`,
    },
    {
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productId}`,
    },
    {
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productId}`,
    },
    {
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productId}`,
    },
    {
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productId}`,
    },

    {
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productId}`,
    },
    {
      Name: "Product Name",
      Discription: "Some thing about the product",
      Price: 250,
      img: `images/${productId}`,
    },
  ];
  res.status(200).render("home", { title: "home Page", product: products });
};
