const Category = require("../models/category");
const Event = require("../models/event");
const rand_id = require("../utils/randomGenerator");
const Operation = require("../models/operation");
                                    
module.exports = {
    /**
     * createCategory function is responsible for inserting a new category to the database
     * data (name, description, name) are sent through the body of the http request in a JSON format
     * the endpoint will respond with a JSON object containing the category ID of the newly added category
     * @param {*} req : request
     * @param {*} res : respond
     */
    createCategory: async function(req, res){
        
        let rand_cat_id = new rand_id("C").gen_rand_id(2);
        try {
            let aCategory = new Category({
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                id: rand_cat_id,
            });
            const operation = await Operation.findOne({});
            operation.createdCount += 1;
            operation.save();
            await aCategory.save();
            res.status(200).json({id: aCategory.id});
        } catch(error) {
            // server respond with status 400 if user provides invalid data
            res.status(400).json({error:"Invalid Data"});
        };
    },
    /**
     * getAll function will list all the categories
     * a list of all categories and the details for their events in JSON format will be sent back as a response to the request
     * @param {*} req 
     * @param {*} res 
     */
    getAll: async function(req, res) {
        let category = await Category.find().populate("eventsList");
        res.json(category);
    },
    /**
     * deleteCategoryById function will delete a category by its ID (which is sent through the request body) and
     * all the events listed in the eventsList field
     * A JSON object containing the number of deleted documents is returned by the endpoint
     * @param {*} req 
     * @param {*} res 
     */
    deleteCategoryById: async function(req, res) {
        let categoryId = req.body.id;
        let foundCategory = await Category.find({id:categoryId});
        // to check if the category id is found in the collection
        if ( foundCategory.length >= 1){
            // if yes, then first delete all the events under this category
            for (i=0; i<foundCategory.length; i++){
                let currentCategory = foundCategory[i];
                currentCategory.eventsList = [];
                currentCategory.save();
            }
            // then only delete the category from the database
            const operation = await Operation.findOne({});
            operation.deletedCount += 1;
            operation.save();
            let result = await Category.deleteMany({id:categoryId});
            // respond with a json object to acknowledge that the category has been deleted
            res.json({acknowledged: true, deletedCount: result.deletedCount});
        }
        else {
            // else, print "Category ID not found" message
            res.json("Category ID not found");
        }
    },
    /**
     * updateCategory function is used to update the category name and description by ID
     * the ID, new name and description are sent as a JSON object through the request body
     * an object with a message is returned to comfirm the update
     * if ID is not found, then the status message "ID not found" will be returned
     * @param {*} req 
     * @param {*} res 
     */
    updateCategory: async function(req, res) {
        let id = req.body.id;
        // get the new name and new description from the request body
        let updatedName = req.body.name;
        let updatedDescription = req.body.description;
        // search for the document to be updated based on category id
        let result = await Category.find({id: id});
        if (result.length == 0){
            // if not found, then return a JSON object to inform that ID is not found
            res.status(400).json({"status":"ID not found"});
        }
        else {
            // else, update the name and description
            let update = {$set: {"name":updatedName, "description": updatedDescription}}
            let updatedResult = await Category.updateMany({id: id}, update);
            const operation = await Operation.findOne({});
            operation.updatedCount += 1;
            operation.save();
            // return a JSON object notifying that an update has been made
            res.status(200).json({"status": updatedResult})
        }
    },    
};

gen_category_id = () => {
	generateString = (length) => {
		/**
		 * This is a function to generate a string based on the given length n
		 * where n random characters will be selected from 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		 */
		const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let result = '';
		const charactersLength = characters.length;
		for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	/**
	 * This is a function to generate a random id for events
	 * where the id will start with E, followed by 2 random characters, followed by a hyphen, 
	 * and then followed by 4 random digits
	 */
	return `C${generateString(2)}-${Math.floor(Math.random()*(9999-1000+1))}`
}
