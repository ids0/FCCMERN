let restaurants

export default class ResutantsDAO {
    // conect to db when server starts 
    static async indectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            // sample_restaurants -> restaurants
            restaurants = await conn.db(proces.env.RESTREVIEWS.NS).collection("restaurants")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`,
            )
        }

    }
    // list of all restaurants
    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        if (filters){
            if ("name" in filters) {
                //search in text that contains filters["name"]
                query = { $text: {$search: filters["name"] } }
            } else if ("cuisine" in filters) {
                //cuisine field equal filters["cuisine"]
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor

        try {

        }
    }
}

