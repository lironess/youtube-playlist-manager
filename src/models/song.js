import Mongoose from 'mongoose';

const schema = new Mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  thumbnailUrl: String,
  duration: Number,
  votes: Number
}, { versionKey: false });

export default {
  schema,
  model: Mongoose.model('song', schema)
};