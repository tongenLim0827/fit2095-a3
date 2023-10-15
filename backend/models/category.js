const mongoose = require("mongoose")
/**
 * Mongoose schema for Category class
 */
const categorySchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        validate: {
            validator: function(value) {
                // a validator to check that "Name" is in alphanumeric values form
                return /^[a-zA-Z0-9 ]+$/.test(value);
            },
            message: "Please enter a valid name"
        },
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "/default_category.png",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    categoryId: String,
    // an array of events' references (which list all the events in the category)
    eventsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
    ]
})

module.exports = mongoose.model("Category", categorySchema)
