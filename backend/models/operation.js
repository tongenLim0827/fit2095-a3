const mongoose = require('mongoose');

/**
 * Mongoose schema file for operation 
 * which tracks the number of add, update and delete operations invoked on the database
 */
const operationSchema = mongoose.Schema({
    deletedCount: {
        type: Number,
        default: 0,
    },
    updatedCount: {
        type: Number,
        default: 0
    },
    createdCount: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Operation', operationSchema);
