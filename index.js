const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const expressError = require("./expressError.js");
const validateChat = require("./validateChat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connection Successful !");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakenewwp');
}

// Index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// New route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs", { errors: [], formData: {} });
});

// Create post
app.post("/chats", validateChat, (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date() // Automatically set the current date
  });

  newChat
    .save()
    .then((savedChat) => {
      console.log("Chat saved:", savedChat);
      res.redirect("/chats"); // Redirect to the chats page after saving
    })
    .catch((err) => {
      console.log("Error saving chat:", err);
      res.status(500).send("Error saving chat.");
    });
});

// Show route
app.get("/chats/:id", async (req, res, next) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  if (!chat) {
    next(new expressError(404, "Chat not found!"));
  }
  res.render("edit.ejs", { chat });
});

// Edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  console.log(chat);
  res.render("edit.ejs", { chat });
});

// Update route
app.put("/chats/:id", validateChat, async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

// Destroy route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

// Error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some error occurred!" } = err;
  res.status(status).send(message);
});

// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port: 8080");
});
