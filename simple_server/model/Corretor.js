const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Corretor = new Schema({
  
  email: {
    type: String
  },
  creci: {
    type: Number
  },
},{
    collection: 'corretor'
});

module.exports = mongoose.model('Corretor', Corretor);