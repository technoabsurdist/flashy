const mongoose = require("mongoose")
const Schema = mongoose.Schema

/* Decide the structure of your database */ 
const QASchema = new Schema({
  question: {
    type: String, 
    required: true 
  }, 
  answer: {
    type: String, 
    default: false 
  }, 
  timestamp: {
    type: String, 
    default: Date.now()
  }, 
})


const QA = mongoose.model("QA", QASchema)

module.exports = QA 


