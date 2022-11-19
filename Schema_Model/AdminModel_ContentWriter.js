const mongoos = require('mongoose');
const userSchema = new mongoos.Schema({
    name: String,
    email: 
    {
      type:String,
      unique: true
    },
    password:String,
    usertype:String
  });
  
  const Admin_ContentwriterModel = mongoos.model("Adni_contentWriter", userSchema);
  module.exports = {Admin_ContentwriterModel};