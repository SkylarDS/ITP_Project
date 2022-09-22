import BakeryProductsDAO from "../dao/BakeryProductsDAO.js";

export default class BakeryProductsController{
    static async apiGetProducts(req, res, next) {

        const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10) :20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.category){

            filters.category = req.query.category

        }else if(req.query.flavor){

            filters.flavor = req.query.flavor

        }else if(req.query.name){

            filters.name = req.query.name

        }

        const {bakeryProductList, totalNumProducts} = await BakeryProductsDAO.getBakeryProducts({

            filters,
            page,
            productsPerPage,

        })

        let response = {

            BakeryProduct: bakeryProductList,
            page: page,
            filters: filters,
            entries_per_page: productsPerPage,
            total_results: totalNumProducts,

        }

        res.json(response)

    }

    

    

    

}