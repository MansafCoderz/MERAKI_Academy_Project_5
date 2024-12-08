const express = require("express");
const messageRouter = express.Router();
const { getMessages } = require("../controllers/SendMessage");

messageRouter.get("/:senderId/:receiverId", getMessages);

module.exports = messageRouter;
