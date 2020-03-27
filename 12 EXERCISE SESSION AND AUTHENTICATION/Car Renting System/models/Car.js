const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const carSchema = new Schema({
    model: {type: Schema.Types.String, require: true},
    imageUrl: {type: Schema.Types.String, require: true},
    pricePerDay: {type: Schema.Types.Number, require: true},
    isRented: {type: Schema.Types.Boolean, require: false},
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;