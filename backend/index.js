import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import restaurantsDAO from "./dao/restaurantsDAO.js"
import reviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

// Conect to db
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParser:true,
        useUnifiedTopology: true, //Mongo warning
    }
)
// Try to catch errors
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
// client
.then(async client => {
    // Connection to db for queries
    await restaurantsDAO.injectDB(client)
    // Connection to db for reviews
    await reviewsDAO.injectDB(client)
    // Start server
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})

