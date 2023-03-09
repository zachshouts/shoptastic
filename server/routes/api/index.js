const router = require("express").Router();
const userRoutes = require("./user-routes");
const categoryRoutes = require("./category-routes");

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
