const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const CATEGORY_VIEWS_PATH = path.join(__dirname, "../views/category/");
const EVENT_VIEWS_PATH = path.join(__dirname, "../views/event/");

// create a reference to Event and Category
const Event = require("../models/event");
const Category = require("../models/category");

const rand_id = require("../utils/randomGenerator");
const Operation = require("../models/operation");

/**
 * The add_category.html file is sent as a response 
 */
router.get('/add-category', function (req, res){
    fileName = CATEGORY_VIEWS_PATH + "add_category.html";
    res.sendFile(fileName);
});

/**
 * A new category is added to the backend server where a category object
 * is created with the name, description and image are passed in as parameters.
 * The values are either obtained from the request body or the default value is used.
 * It will also redirect to the list all categories page
 */
router.post('/add-category', async function (req, res) {
    if (req.body.name != ""){
        let rand_cat_id = new rand_id("C").gen_rand_id(2);
        let image = req.body.image;
        if (image==""){
            image = "/default_category.png";
        }
        let newCategory = new Category({
            name: req.body.name,
            description: req.body.description, 
            image: image,
            id: rand_cat_id,
        });
        const operation = await Operation.findOne({});
		operation.createdCount += 1;
		operation.save();
        await newCategory.save();
    }
	res.redirect("/event-category/32905165/list-categories");
});

/**
 * Renders the list_category.html file which shows a list of categories as tabular format
 */
router.get('/list-categories', async function (req, res){
    let myCategories = await Category.find();
    res.render("category/list_category", { categories: myCategories });
});

/**
 * Renders the list_category.html file which displays a list of categories where their description
 * matches the given keyword from the query string 
 */
router.get('/search-category', async function (req, res){
    let keyword = req.query.keyword;
    let myCategories = await Category.find();
    if (keyword==""){
        let no_match = []
        res.render("category/list_category", { categories: no_match, keyword: keyword });
    }
    else{
        const filtered_categories = myCategories.filter(c=>c.description.split(" ").includes(keyword));
        res.render("category/list_category", { categories: filtered_categories });
    }
});

/**
 * Renders the show_event.html file which contains information about event details which 
 * matches the given id from the URL parameter
 */
router.get('/event/:id',async function(req,res){
    let eventId = req.params.id
    let event = await Event.findOne({eventId: eventId}).populate('categoryList')
    if (event) {
        const event_categories = event.categoryList;
        res.render(EVENT_VIEWS_PATH + "show_event.html", {
          records: event,
          categories: event_categories,
        });
    }
    else{
        res.render("event/list_events", { records: [], categories: [] });
    }
});

/**
 * Sends the delete_category_byId.html file as a response
 */
router.get('/delete-category-byId', function (request, res){
    fileName = CATEGORY_VIEWS_PATH + "delete_category_byId.html";
    res.sendFile(fileName);
});

/**
 * Deletes a category where its id matches the given id from the request's body
 * and redirect to list all categories page where this category has been deleted
 */
router.post('/delete-category-byId', async function(req, res) {
    let id = req.body.id;
    let myCategories = await Category.find({id: id});
    await Category.deleteMany({id:id});
    const operation = await Operation.findOne({});
    operation.deletedCount += 1;
    operation.save();
    res.redirect("/event-category/32905165/list-categories");
});

module.exports = router;
