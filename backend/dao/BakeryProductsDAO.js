let BakeryProduct

export default class BakeryProductsDAO{

    static async injectDB(conn){

        if(BakeryProduct){

            return

        }
        try{

            BakeryProduct = await conn.db(process.env.product_database).collection("Bakery_Items")
        
        }catch(e){

            console.error(
                'Unable to establish a collection handle in BakeryProductsDAO: ${e}', 
            )

        }

    }

    static async getBakeryProducts({

        filters = null,
        page = 0,
        productsPerPage = 20,

    } = {}){

        let query
        if(filters){

            if("name" in filters){

                query = {$text: { $search: filters["name"]}}

            }else if("category" in filters){

                query = {"category": {$eq: filters["category"]}}

            }else if("flavor" in filters){

                query = {"cake.flavor": {$eq: filters["flavor"]} }

            }

        }

        let cursor

        try{

            cursor  = await BakeryProduct
                .find(query)

        }catch(e){

            console.error('Unable to issue find command, ${e}')
            return {bakeryProductList: [], totalNumProducts: 0}

        }

        const displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * page)
        
        try{
            
            const bakeryProductList = await displayCursor.toArray()
            const totalNumProducts = await BakeryProduct.countDocument(query)

            return{bakeryProductList, totalNumProducts}
        } catch (e){

            console.error(
                'Unable to convert cursor to array or problem counting documents, ${e}'
            )

            return{bakeryProductList: [], totalNumProducts: 0}

        }

    }

}

