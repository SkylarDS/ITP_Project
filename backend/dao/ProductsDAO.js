import { dblClick } from "@testing-library/user-event/dist/click"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let products

export default class ProductsDAO{

    static async injectDB(conn){

        if(products){

            return

        }
        try{

            products = await conn.db(process.env.product_database).collection("Bakery_Items")

        }catch(e){

            console.error(
                'Unable to establish a collection handle in ProductsDAO: ${e}', 
            )

        }

    }

    static async addProduct(productID, name, flavor, price, date){

        try{

            const productDoc = { name: Bakery_Items.name,
                productID: Bakery_Items._id,
                date: date,
                flavor: Bakery_Items.flavor,
                price: Bakery_Items.price

                
            }
            return await products.insertOne(productDoc)
            

        }catch (e){

            console.error('Unable to add product: ${e}')
            return{error: e}

        }


    }

    static async updateProduct(productID, price, date){

        try{

            const updateResponse = await products.updateOne(

                {_id: productID},//check here
                {$set: {price:price, date:date}},
            )

            return updateResponse

        }catch (e){

            console.error('Unable to update product: ${e}')
            return{error: e}

        }

    }
    static async deleteProducts()

}
