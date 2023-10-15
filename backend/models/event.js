const DateFormat = require('../utils/dateFormat')
const mongoose = require('mongoose')
/**
 * Mongoose schema for Event class
 */
const eventSchema = mongoose.Schema({
    eventId: String,
    name: {
        type: String,
        required:true
    },
    description: String,
    startDateTime: {
        type:String,
        required: true
    },
    endDateTime: {
        type:String,
        default: function () {
            let temp = new Date(this.startDateTime);
            temp.setMinutes(temp.getMinutes() + parseInt(this.durationInMinutes))
            return DateFormat.formatDate(temp);
        }
    },
    image:{
        type: String,
        default: "/default_event.png"
    },
    durationInMinutes:{
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        default: 1000,
        // validator to accept number between 10 and 2000 (inclusive) only
        validate: {
            validator: function (value) {
                if (value === null) {
                    return true;
                }
                return 10 <= value && value <= 2000
            },
            message: "Must be between 10 and 2000"
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    tickets: {
        type: Number,
        default: function () {
            // Set the default value of lastLoginDate to be the same as registrationDate
            return this.capacity;
          },
    },
    // an array of categories' references, listing all the categories in this event
    categoryList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
    ]
})

eventSchema.pre('save', function (next) {
    if (this.capacity === null) {
      // Replace null with the default value
      this.capacity = 1000;
    }
    next();
  });

  eventSchema.pre('save', function (next) {
    if (this.tickets === null) {
      // Replace null with the default value
      this.tickets = this.capacity;
    }
    next();
  });

eventSchema.statics.trackDeletion = async function () {
    const DeletionLog = mongoose.model('DeletionLog');
    await DeletionLog.findOneAndUpdate({}, { $inc: { deletionCount: 1 } }, { upsert: true });
  };

module.exports = mongoose.model("Event",eventSchema)

