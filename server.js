const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/strategyscope",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://user:password1@ds261917.mlab.com:61917/heroku_mq9x8c62",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});

http.listen(PORT);
console.log("running on port:" + PORT);
