import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews
 
export default class ReviewsDAO {
    // conect to db when server starts 
    static async injectDB(conn) {
        // if allready exist just return
        if (reviews) {
            return
        }
        // try to connect to specific collection
        try {
            // sample_restaurants -> reviews 
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in reviewsDAO: ${e}`,
            )
        }

    }

    static async addReview(restaurantId, user, review, date) {
        try {
            // Create db object from request
            const reviewDoc = { name:user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            }
            // Insert review on db
            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return {error: e}
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                // search for specific review
                { user_id: userId, _id: ObjectId(reviewId) },
                 // Update review
                { $set: {text: text, date: date} },
            ) 
            return updateResponse

        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne(
                { _id: ObjectId(reviewId), user_id: userId }
            )
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

}