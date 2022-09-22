import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import BakeryProductsDAO from "./dao/BakeryProductsDAO.js"
dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(

    process.env.BAKERYPRODUCTS_DB_URI,{

        poolSize: maxPoolSize,
        wtimeout: wtimeoutMS,
        useNewUrlParse: useNewUrlParser

    }

)
.catch(err =>{

    console.error(err.stack)
    process.exit(1)

})
.then(async Client => {

    await BakeryProductsDAO.injecDB(Client)

    app.listen(port, () =>{

        console.log('listning on port ${port}')

    })
    
})