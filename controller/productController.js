module.exports.productDetailView = (req, res) => {
  let id = req.query.id;
  res
    .status(200)
    .render("product/productDetailView", { title: "Product Name", id: id });
};
