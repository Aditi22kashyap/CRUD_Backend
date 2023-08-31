const mongoose = require('mongoose');
const recordSchema = new mongoose.Schema({
    name:String,
    disc:String,
    status:Boolean,
    category:String
})

const records = mongoose.model("records",recordSchema);

module.exports = {
    records
}