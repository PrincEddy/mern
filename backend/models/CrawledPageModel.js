import mongoose, { Schema } from 'mongoose';

const crawledPageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  //todo: add here the missing fields
  description:{
    type:String,
    required:true,

  },
  title:{
    type:String,
    required:true,

  },
  h1 : {
    type:String,
    required:true,

  },
  h2 : {
    type:String,
    required:true,

  },
  links : {
    type:Number,
    required:true,

  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('CrawledPage', crawledPageSchema);
