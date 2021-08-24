const mongoose = require('mongoose');
 const categorySchema = new mongoose.Schema({
 name:{
     type:String,
     required:true,
     trim:true
 },
 slug:{
     type:String,
     required:true,
     unique:true
 },
//    type show what is this is it Store or list
    type:{
        type:String
    },
//  parentiId means categoryid  of electronic parent
// men -> children child
 parentId:{
     type:String,
 },
 categoryImage:{type:String}


 },{timestamps:true})
 module.exports = mongoose.model('Category',categorySchema);
