const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    description: {type: Schema.Types.String, required: true},
    imageUrl: {type: Schema.Types.String, required: true},
    difficulty: {type: Schema.Types.Number, required: true}
});

cubeSchema.path('name')
    .validate(function () {
        return this.name.length >= 3 && this.name.length <= 15;
    }, 'Name must be between 3 and 15 symbols!');

cubeSchema.path('description')
    .validate(function () {
        return this.description.length >= 20 && this.description.length <= 300;
    }, 'Description must be between 20 and 300 symbols');

// todo fix the code below
// cubeSchema.path('imageUrl')
//     .validate(function () {
//         return this.imageURL.startsWith('https') && (this.imageURL.endsWith('.jpg') || this.imageURL.endsWith('.png'));
//     }, 'Image URL must start with https and ends with .jpg or .png');

cubeSchema.path('difficulty')
    .validate(function () {
        return this.difficulty >= 1 && this.difficulty <= 6;
    }, 'Difficulty should be between 1 and 6');

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;