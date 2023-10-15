const express = require("express");
const eventCount = require("../controllers/event-controller");

const router = express.Router();

/**
 * Router to handle api endpoints for event
 */
router.post("/create-event", eventCount.createEvent);
router.get("/list-events", eventCount.getAll);
router.delete("/delete-events",eventCount.deleteById);
router.put("/update-events",eventCount.updateById);

module.exports = router;
