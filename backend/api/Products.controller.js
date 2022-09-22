import ProductsDAO from "../dao/ProductsDAO.js"
import bson from "bson"
const ObjectId = bson.ObjectId


export default class ProductsController{

    static async apiPostProduct(req, res, next){

        try{

            const productID = req.body._id
            const productInfo = {

                name: req.body.productname,//check here
                price: req.body.productPrice 
            }

            const date = new Date()

            const ProductResponse = await ProductsDAO.addProduct(

                productID,
                productInfo,
                date,

            )

            res.json({status: "success"})

        }catch(e){
            
            res.status(500).json({error:e.message})

        }

    }

    static async apiUpdateProduct(req, res, next){

        try{
            const pID = req.body._id
            const pPrice = req.body.productPrice
            const date = new Date()

            const ProductResponse = await ProductsDAO.updateProduct(

                pID,
                pPrice,
                date,

            )

            var {error} = ProductResponse
            if(error){

                res.status(400).json({error})

            }

            if(ProductResponse.modifiedCount === 0){

                throw new Error(

                    "unable to update product - user may not be the original poster",

                )

            }

            res.json({status: "success"})

        }catch(e){
            
            res.status(500).json({error:e.message})

        }


    }
    static async apiDeleteProduct(req, res, next){

        try{

            const productID = req.query._id
            const pid = req.body._id

            console.log(productID)
            const ProductResponse = await ProductsDAO.deleteProduct(

                productID,
                pID,

            )
            
            res.json({status: "success"})
        }catch(e){
            
            res.status(500).json({error:e.message})

        }

    }

}