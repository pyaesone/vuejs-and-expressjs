var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = Schema({
  name: { type: String},
  completed: {type: Boolean,default: false}
});
module.exports = mongoose.model('Task', TaskSchema);
