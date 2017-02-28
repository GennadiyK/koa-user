const mongoose = require('./mongoose');
let userSchema = new mongoose.Schema({
  //User имеет уникальный email, а также даты создания и модификации и имя displayName.
  displayName: {
    type: String,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    required: 'Укажите email',
    lowercase: true,
    trim: true
  }
  
},{
  timestamps: true
  }
);

module.exports = mongoose.model('User',userSchema);