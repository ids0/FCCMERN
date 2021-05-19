import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class restaurantsController {
    static async apiGetRestaurants(req,res,next){
        // if restaurantsPerPage exist in URL convert to int
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurant, 10) : 20
        // Check if specific page number is requested
        const page = req.query.page ? parseInt(req.query.page, 10) : 0 
        
        let filters = {}
        // check for queries in url
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage,
        })

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
            
        }

        res.json(response)
    }

}