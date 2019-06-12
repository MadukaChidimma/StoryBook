const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create  schema
const StorySchema = new Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true,
    default: "public"
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  comments: [{
      commentBody: {
        type: String,
        required: true
      },
      commentDate: {
          type: Date,
          default: Date.now
      },
      commentUser: {
          type: Schema.Types.ObjectId,
          ref: 'users'
      }
    }],
    user:{
        type: Schema.Types.ObjectId,
          ref: 'users'
    } ,
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("stories", StorySchema, 'stories');
