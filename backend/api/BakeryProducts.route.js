import express from "express"
import BakeryProductsCtrl from "./BakeryProducts.controller.js"
import ProductsCtrl from "./Products.controller.js"

const router = express.Router()

router.route("/").get(BakeryProductsCtrl.apiGetProducts)
router.route("/id/:id").get(BakeryProductsCtrl.apiGetProductsById)
router.route("/flavor").get(BakeryProductsCtrl.apiGetProductsByFlavors)

router
    .route("/products")//this might be Products
    .post(ProductsCtrl.apiPostProduct)
    .put(ProductsCtrl.apiUpdateProduct)
    .delete(ProductsCtrl.apiDeleteproduct)

export default router