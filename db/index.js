// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb+srv://meenathirunau:meenathirunau@todolist.p7raykg.mongodb.net/SAM-shoppy?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Set a larger timeout (30 seconds)
  })
  .then((x) => {
    const dbName = x.connections[0].name;
    (`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
