const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
const uuid = require("node-uuid");

let exportedMethods = {
    async getAllRestaurants() {
        const restaurantModel = await restaurants();
        const restaurantCollection = await restaurantModel.find({}).toArray();
        return restaurantCollection;
    },

    async getRestaurantBySchoolId(schoolId) {
        if(schoolId && schoolId != null) {
            const restaurantCollection = await restaurants();
            var query = { schoolid: schoolId };
            const schoolRestaurantCollection = restaurantCollection.find(query).toArray();
            return schoolRestaurantCollection;
        } else {
            throw "School not found withh the ID specified."
        }
    },

    async getRestaurantById(id) {
        if(id && id != null) {
            const restaurantCollection = await restaurants();
            const restaurant = await restaurantCollection.findOne({ _id: id });
            if(!restaurant) {
                throw "Oops! no restaurant found.";
            }
            return restaurant;
        } else {
            throw "Restaurant does not exist with that ID specified."
        }
    },

    async addRestaurant(restaurant) {
        const restaurantCollection = await restaurants();
        const newRestaurant = 
        {
            _id: uuid.v4(),
            name: restaurant.name,
            schoolid: restaurant.schoolid,
            score: restaurant.score,
            logoimg: restaurant.logoimg,
            description: restaurant.description,
            address: restaurant.address,
            comments: []
        }
        const restaurantInserted = await restaurantCollection.insertOne(newRestaurant);
        const restaurantId = restaurantInserted.insertedId;
        restaurantStored = await this.getRestaurantById(restaurantId);
        return restaurantStored;   
    }
};


module.exports = exportedMethods;