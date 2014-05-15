var mongoose = require('mongoose');
var member  = require('./memberModel');
var Schema = mongoose.Schema;
var project = new Schema({
     name:String
    ,status:{type:Number,default:0}
    ,creatTime:{type:Number,default:F.date.time()}
    ,updateTime:{type:Number,default:F.date.time()}
    ,author:{ type: Schema.Types.ObjectId, ref: 'member' }
},{ collection: 'project'});
module.exports = M.mongoose.model('project', project);
