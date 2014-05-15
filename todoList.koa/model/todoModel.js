var mongoose = require('mongoose');
var member  = require('./memberModel');
var project  = require('./projectModel');
var Schema = mongoose.Schema;
var todoList = new Schema({
    title:String
    ,content:String
    ,limitTime: Date
    ,status:{type:Number,default:0}
    ,creatTime:{type:Number,default:F.date.time()}
    ,updateTime:{type:Number,default:F.date.time()}
    ,author:{ type: Schema.Types.ObjectId, ref: 'member' }
    ,project: { type: Schema.Types.ObjectId, ref: 'project' }
    ,tags:[]
},{ collection: 'todoList'});
module.exports = M.mongoose.model('todoList', todoList);
