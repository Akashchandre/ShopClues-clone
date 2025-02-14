const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  subCategory: { type: String, required: false }
});
productSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('Product', productSchema);