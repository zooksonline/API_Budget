const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({});

module.exports = Log = mongoose.model("log", LogSchema);
