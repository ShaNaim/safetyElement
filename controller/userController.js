module.exports.userProfileView = (req, res) => {
  res.status(200).render("user/profile.ejs", { title: " My Profile" });
};
