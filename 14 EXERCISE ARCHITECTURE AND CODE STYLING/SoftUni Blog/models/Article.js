const {Schema, model} = require('mongoose');

const articleSchema = new Schema({
    title: {type: Schema.Types.String, require: true},
    content: {type: Schema.Types.String, require: true},
    author: {type: Schema.Types.ObjectId, require: true, ref: 'User', unique: true},
    date: {type: Schema.Types.Date, default: Date.now},
});

module.exports = model('Article', articleSchema);