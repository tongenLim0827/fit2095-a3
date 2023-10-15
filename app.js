const express = require("express");
const mongoose = require("mongoose");

const app = express();
const path = require("path");
const server = require("http").Server(app);
const fs = require("fs");
const io = require("socket.io")(server);

// Import translator 
const { Translate } = require("@google-cloud/translate").v2; // Corrected import
// Import Text To Speech from Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

// Creates a client
const translate = new Translate();
const ttsclient = new textToSpeech.TextToSpeechClient();

// listen to port number
const port = 8080;
server.listen(port, () => {
  console.log("Listening on port " + port);
});

// create a reference to Event and Category, and Operation
const Event = require("./backend/models/event");
const Category = require("./backend/models/category");
const Operation = require("./backend/models/operation");

// routers
const events = require("./backend/routes/event-routes");
const CATEGORY_API_ROUTER = require("./backend/routes/category-routes-api");
const EVENT_API_ROUTER = require("./backend/routes/event-routes-api");

// paths
app.use("/", express.static(path.join(__dirname, "./dist/asgn3")));
app.use(express.json());
app.use(function (req, res, next) {
  console.log(req.url);
  next();
});
app.use("/api/v1/category/32905165", CATEGORY_API_ROUTER);
app.use("/", express.static(path.join(__dirname, './backend/output')));
app.use("/andy/api/v1/event", EVENT_API_ROUTER);

// connect to database
let url = "mongodb://127.0.0.1:27017/assignment2"
async function connect() {
    await mongoose.connect(url);
    if (await Operation.countDocuments() === 0){
      let operation = new Operation({
          createdCount: 0,
          deletedCount: 0,
          updatedCount: 0
      });
      await operation.save();
      console.log("Connected Successfully");
  }
}
connect().catch((err) => console.log(err));

//Event endpoints
app.get("/event", events.getAll);
app.post("/event", events.createOne);
app.delete("/event/:id", events.deleteOne);
app.get("/event/:id", events.getOne);
app.put("/event",events.updateOne)
app.get("/operations", events.getOps)


async function translateText(text, targetLanguage) {
  try {
    const results = await translate.translate(text, targetLanguage);
    const translatedText = results[0]; // Store the translated text in the variable
    console.log(`Original text: ${text}`);
    console.log(`Translation: ${translatedText}`);
    
    return translatedText;
  } catch (err) {
    console.error("ERROR:", err);
    return null;
  }
}

io.on("connection", socket => {
  console.log("new connection made from client with ID=" + socket.id);

  socket.on("newMsg", async data => {
    console.log(data.targ)
      io.sockets.emit("msg",{text:data.text, targ: data.targ, transl: await translateText(data.text,data.targ)});
  });
});

// route for show category details
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

// route to handle statistic of category and event
app.get('/event-category/32905165/stats', async function (req, res){
  let events = await Event.countDocuments({});
  let categories = await Category.countDocuments({});
  res.json({events: events, categories: categories});
})

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


