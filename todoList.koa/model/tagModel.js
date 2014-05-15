var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tag = new Schema({
     name:String
    ,key:String
    ,createtime:{type:Number,default:F.date.time()}
},{ collection: 'tag'});

module.exports = mongoose.model('tag', tag);
