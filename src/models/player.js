const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  position: { type: String, required: true, max: 100 },

});

PlayerSchema
  .virtual('name')
  .get(() => {
    return `${this.first_name} ${this.last_name}`;
  });

module.exports = mongoose.model('Player', PlayerSchema);
