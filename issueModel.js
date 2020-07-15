var mongoose = require("mongoose")
const Schema = mongoose.Schema

const issueSchema = new Schema({
  
  issue_title: {type:String},
  issue_text: {type:String},
  created_on: Date,
  updated_on: Date,
  created_by: {type:String},
  assigned_to: String,
  open: Boolean,
  status_text: String
})

const Issue = mongoose.model("Issue", issueSchema)

module.exports= Issue