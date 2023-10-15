const Category = require("../models/category");
const Event = require("../models/event");
const Operation = require("../models/operation");
const DateFormat = require("../utils/dateFormat");

module.exports = {
	/**
     * createEvent function is responsible for inserting a new event to the database
     * data (name, description, startDateTime, durationInMinutes, status, capacity, tickets, categoryList, image, eventId) 
	 * are sent through the body of the http request in a JSON format
     * the endpoint will respond with a JSON object containing the event ID of the newly added event
     * @param {*} req : request
     * @param {*} res : respond
     */
	createEvent: async function addEvent(req, res) {
		let cat_lst = req.body.categories.split(",")
		let categories = await Category.find({id: {$in: cat_lst}})
		let categoryList = categories.map(category => category._id)
		let image = req.body.image;
        if (image==""){
            image = "/default_category.png";
        }
		let anEvent = new Event({ 
            name: req.body.name, 
            description: req.body.description,
            startDateTime: req.body.startDateTime instanceof Date ? 
			DateFormat.formatDate(req.body.startDateTime) :
			DateFormat.formatDate(new Date(req.body.startDateTime)),
            durationInMinutes: DateFormat.formatTime(req.body.durationInMinutes),
			status: req.body.status,
			capacity: req.body.capacity,
			tickets: req.body.tickets,
            categoryList: categoryList,
			image: image,
			eventId: gen_event_id()
        });
		let operation = await Operation.findOne({});
		operation.createdCount += 1;
		operation.save();
		await anEvent.save();
		categories.forEach(category => {
			category.eventsList.push(anEvent._id)
			category.save()
		})
		res.status(200).json({eventId: anEvent.eventId});
	},
	/**
     * getAll function will list all the events
     * a list of all events and the details for their categories in JSON format will be sent back as a response to the request
     * @param {*} req 
     * @param {*} res 
     */
	getAll: async function (req, res) {
		let events = await Event.find().populate("categoryList")
		res.status(200).json(events);
	},
	/**
     * deletebyId function will delete an event by its ID (which is sent through the request body) and
     * the ID of the deleted event will also be removed from the eventsList array in all the categories listed in the categoryList
     * A JSON object containing the number of deleted documents is returned by the endpoint
     * @param {*} req 
     * @param {*} res 
     */
	deleteById: async function (req, res) {
		let id = req.body.eventId;
		let foundEvent = await Event.find({eventId:id});
        // to check if the event id is found in the collection
        if ( foundEvent.length >= 1){
            const operation = await Operation.findOne({});
            operation.deletedCount += 1;
            operation.save();
            let result = await Event.deleteMany({eventId:id});
            // respond with a json object to acknowledge that the category has been deleted
            res.json({acknowledged: true, deletedCount: result.deletedCount});
        }
        else {
            // else, print "Event ID not found" message
            res.json("Event ID not found");
        }
	},
	/**
     * updateById function is used to update the event name and capacity by ID
     * the ID, new name and capacity are sent as a JSON object through the request body
     * an object with a "updated successfully" message is returned to comfirm the update
     * if ID is not found, then the status message "ID not found" will be returned
     * @param {*} req 
     * @param {*} res 
     */
	updateById: async function (req, res) {
		let id = req.body.eventId;
		let name = req.body.name;
		let capacity = req.body.capacity;
		let theEvent = await Event.findOne({eventId: id});
		theEvent.name = name;
		theEvent.capacity = capacity;
		theEvent.tickets = Math.min(theEvent.tickets, capacity)
		const operation = await Operation.findOne({});
		operation.updatedCount += 1;
		operation.save();
		await theEvent.save();
		res.json({
			"status": "updated successfully"
		})
	}
};

gen_event_id = () => {
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
	return `E${generateString(2)}-${Math.floor(Math.random()*(9999-1000+1))}`
}
