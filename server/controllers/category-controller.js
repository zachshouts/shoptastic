const { Category } = require("../models");

module.exports = {
  getAllCategories(req, res) {
    Category.find()
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No categories found" });
        } else {
          res.json(data);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
