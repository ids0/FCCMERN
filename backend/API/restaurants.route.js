import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
const router = express.Router()
// Routes
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

export default router