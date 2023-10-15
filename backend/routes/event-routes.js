// const express = require("express");
// const eventCount = require("../controllers/event-controller");
// const path = require("path");
// const Event = require("../models/event");
// const Category = require("../models/category")

// const router = express.Router();

// const CATEGORY_VIEWS_PATH = path.join(__dirname, "../views/category/");
// const EVENT_VIEWS_PATH = path.join(__dirname, "../views/event/");
// const VIEWS_PATH = path.join(__dirname, "/views/");

// /**
//  * A new event is added to the backend server where an event object
//  * is created with the name, description, date, duration, status, image, capacity, tickets and 
//  * category are passed in as parameters.
//  * The values are either obtained from the request body or the default value is used.
//  * It will also redirect to the list all events page
//  */
// router.get("/add", function(req,res){
//     fileName = EVENT_VIEWS_PATH + "add_event.html"
//     res.sendFile(fileName)
// })

// router.post("/add", async function addEvent(req, res) {
//     const apiUrl = '/andy/api/v1/event/create-event'; // Relative path to the API endpoint
//     const fullUrl = `${req.protocol}://${req.get('host')}${apiUrl}`;
//     await fetch(fullUrl, {
//         method: 'POST', // Set the HTTP method to POST
//         headers: {
//             'Content-Type': 'application/json' 
//         },
//         body: JSON.stringify(req.body) 
//     })
//     res.redirect("/andy/event/view");
// });

// /**
//  * Renders the list_events.html file which shows a list of events as tabular format
//  */
// router.get('/view', async function (req, res){
//     res.render(EVENT_VIEWS_PATH + "list_events.html", { records: await Event.find({}).populate({
//         path: 'categoryList'
//     }) });
// });


// /**
//  * Renders the list_events.html file which shows a list of sold-out events as tabular format
//  */
// router.get('/sold-out', async function (req, res){
//     res.render(EVENT_VIEWS_PATH + "list_events.html", { records: await Event.find({tickets: 0}) });
// });

// /**
//  * Renders the category_detail.html file which contains information about category details and also the list of events under
//  * that category which matches the given id from the URL parameter
//  */
// router.get('/show-category/:id', async function (req, res){
//     let categoryId = req.params.id
//     let category = await Category.findOne({id: categoryId}).populate('eventsList');
//     if (category) {
//         let events = await Event.find({_id:{$in:category.eventsList.map(event=>event._id)}}).populate('categoryList');
//         res.render(CATEGORY_VIEWS_PATH + "category_detail.html", {
//           records: category,
//           events: events,
//         });
//     }
//     else{
//         res.render(CATEGORY_VIEWS_PATH + "category_detail.html", { records: [], events: [] });
//     }
// });

// /**
//  * Render the delete_event_byId.html file as a response 
//  */
// router.get('/delete', async function (req, res) {
//     if ((await Event.find({eventId:req.query.id})).length > 0){
//         const apiUrl = '/andy/api/v1/event/delete-events'; // Relative path to the API endpoint
//         const fullUrl = `${req.protocol}://${req.get('host')}${apiUrl}`;
//         let id = req.query.id;
//         await fetch(fullUrl, {
//             method: 'DELETE', // Set the HTTP method to POST
//             headers: {
//                 'Content-Type': 'application/json' 
//             },
//             body: JSON.stringify({eventId: id}) 
//         })
//         res.redirect("/andy/event/view")
//     }
//     fileName = EVENT_VIEWS_PATH + "delete_event_byId.html";
//     res.sendFile(fileName)
// });


// module.exports = router;


const Category = require("../models/category");
const Event = require("../models/event");
const Operation = require("../models/operation");
const DateFormat = require("../utils/dateFormat");

module.exports = {

	getOps: async function (req, res) {
		let operations = await Operation.find({});
		res.json(operations)
	  },
	
	getAll: async function (req, res) {
		let events = await Event.find({});
		res.json(events);
	  },
	createOne: async function (req, res) {
		let newEventDetails = req.body;
		let event = new Event(newEventDetails);
		try {
		  await event.save();
		  let operation = await Operation.findOne({});
		  operation.createdCount += 1;
		  await operation.save();
		  res.json(event);
		} catch (ValidationError) {
		  res.status(400).json({error:"Invalid Data"});
		}
	  },
	
	getOne: async function (req, res) {
		console.log(req.params)
		let event = await Event.findOne({ _id: req.params.id })
		  .populate()
		  .exec();
		console.log(event)
		res.json(event);
	  },
	
	updateOne: async function (req, res) {
		let event = await Event.findOne({ _id: req.body._id})
		.populate()
		.exec();
		try {
		  event.name = req.body.name2
		  event.capacity = req.body.capacity2
		  await event.save();
		  res.json(event)
		} catch (ValidationError) {
		  res.status(400).json({error:"Invalid Data"});
		}
	  },
	
	deleteOne: async function (req, res) {
		let doc = await Event.findOneAndRemove({ _id: req.params.id });
		const operation = await Operation.findOne({});
		operation.deletedCount += 1;
		operation.save();
		res.json(doc);
	  },
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
