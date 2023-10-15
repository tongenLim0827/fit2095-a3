const express = require("express");
const mongoose = require("mongoose");

const app = express();
const path = require("path");
const fs = require("fs");
const server = require("http").Server(app);
// create a socket
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
});

// import Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

// create a reference to Event and Category, and Operation
const Event = require("./backend/models/event");
const Category = require("./backend/models/category");
const Operation = require("./backend/models/operation");

// Creates client
const ttsclient = new textToSpeech.TextToSpeechClient();

// listen to port number
const port = 8080;
server.listen(port, () => {
    console.log("Listening on port " + port);
})

// routers
const CATEGORY_API_ROUTER = require("./backend/routes/category-routes-api");


// paths
app.use("/", express.static(path.join(__dirname, './dist/asgn3')));
app.use(express.json());
app.use("/api/v1/category/32905165", CATEGORY_API_ROUTER);
app.use("/", express.static(path.join(__dirname, './backend/output')));

app.get('/event-category/32905165/show-category/:id', async function (req, res){
    let categoryId = req.params.id
    let category = await Category.findOne({id: categoryId}).populate('eventsList');
    if (category) {
        let events = await Event.find({_id:{$in:category.eventsList.map(event=>event._id)}}).populate('categoryList');
        res.json({ records: category, events: events });
    }
    else{
        res.json({ records: null, events: null });
    }
});

app.get('/event-category/32905165/stats', async function (req, res){
    let events = await Event.countDocuments({});
    let categories = await Category.countDocuments({});
    res.json({events: events, categories: categories});
})

// connect to database
let url = "mongodb://127.0.0.1:27017/assignment2"
async function connect() {
    await mongoose.connect(url);
}
connect().catch((err) => console.log(err));

io.on("connection", (socket) => {
    socket.on('convertTextToSpeechTask', async (data) => {
        // Construct the request
        const request = {
        input: { text: data },
        // Select the language and SSML Voice Gender (optional)
        voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
        // Select the type of audio encoding
        audioConfig: { audioEncoding: "MP3" },
        };
        // Performs the Text-to-Speech request
        ttsclient.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error("ERROR:", err);
                return;
            }
            // Write the binary audio content to a local file
            fs.writeFile("./backend/output/output.mp3", response.audioContent, "binary", (err) => {
                if (err) {
                    console.error("ERROR:", err);
                    return;
                }
                socket.emit('speech-output', { status: 200, message: "Audio content written to file: output.mp3" });
            });
        });
    });   
});


