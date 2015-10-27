import Mongoose from 'mongoose';
import { schema as SongSchema } from './song';

const schema = new Mongoose.Schema({
  _id: String,
  nowPlaying: SongSchema,
  songs: [SongSchema]
}, { versionKey: false });

export default {
  schema,
  model: Mongoose.model('playlist', schema)
};