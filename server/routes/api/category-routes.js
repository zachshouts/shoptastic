const router = require("express").Router();

const { getAllCategories } = require("../../controllers/category-controller/");

router.route("/").get(getAllCategories);

module.exports = router;
