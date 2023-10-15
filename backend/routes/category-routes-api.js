const express = require("express");
const categoryCont = require("../controllers/category-controller");

const router = express.Router();

/**
 * Router to handle api endpoints for category
 */
router.post("/createCategory", categoryCont.createCategory);
router.get("/list-categories", categoryCont.getAll);
router.delete("/delete-category-by-id", categoryCont.deleteCategoryById);
router.put("/update-category", categoryCont.updateCategory);

module.exports = router;