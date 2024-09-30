const express = require("express")
const { getFilteredPrdoucts, getProductDetails } = require("../../controllers/shop/products-controller")
const router = express.Router()

router.get('/get', getFilteredPrdoucts)
router.get('/get/:id', getProductDetails)


module.exports = router