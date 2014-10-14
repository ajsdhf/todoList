/**
 * Created by zhenyi.shi on 14-6-13.
 */

module.exports = function(module,app,route,parse,render){
    app.use(route.get('/'+module+'/getToday', getToday));
    app.use(route.get('/'+module+'/getRecentDays', getRecentDays));
    app.use(route.get('/'+module+'/getCateCount', getCateCount));
    app.use(route.get('/'+module+'/getEventsByProject', getEventsByProject));
    app.use(route.get('/'+module+'/addEvent', addEvent));
    app.use(route.get('/'+module+'/updateEvent', updateEvent));

    var dayArrar = {
        0 : '日',
        1 : '一',
        2 : '二',
        3 : '三',
        4 : '四',
        5 : '五',
        6 : '六'
    };

    //获取今天的事件
    function *getToday(){
        var query = this.request.query,
            userId = query.userId,
            date = new Date(),
            fromDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()),
            //afterDate = date.setDate(fromDate.getDate() + 1),
            from = fromDate.getTime();//,after = afterDate;

        var list = yield function(fn){
            D(module).$where('this.author == "'+ userId +'" && this.deadLine == ' + from.toFixed(0) ).exec(function(err,d){
                if(err)fn(err);
                fn(null,d);
            })
        }

        var returnJson = [{
            name: '今天',
            time: (date.getMonth() + 1) + '月' + date.getDate() + '日' + '(' + dayArrar[date.getDay()] + ')',
            events: list
        }]

        this.body = {data:returnJson};
    }

    //获取最近七天
    function *getRecentDays(){
        var query = this.request.query,
            userId = query.userId,
            date = new Date(),
            today = new Date(),
            fromDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()),
            afterDate = date.setDate(fromDate.getDate() + 7),
            from = fromDate.getTime();//,after = afterDate;

        var list = yield function(fn){
            D(module).$where('this.author == "'+ userId +'" && this.deadLine >= ' + from.toFixed(0) + ' && this.deadLine <='  + afterDate).exec(function(err,d){
                if(err)fn(err);
                fn(null,d);
            })
        }

        var returnJson = [];
        for(var i = 0;i < 7;i ++){
            var tagetDate = from + 1 * 24 * 60 * 60 * 1000 * i;
            var nowDate = new Date(tagetDate);
            var _j = {
                name: i == 0 ? '今天' : (i == 1 ? '明天' : dayArrar[nowDate.getDay()] ),
                time: (nowDate.getMonth() + 1) + '月' + nowDate.getDate() + '日' + (i <= 1 ? '(' + dayArrar[nowDate.getDay()] + ')' : ''),
                events: []
            }
            for(var j = 0;j < list.length;j ++){
                //console.log(tagetDate,nowDate.getTime(),list[j].deadLine)
                if(tagetDate == list[j].deadLine ){
                    _j.events.push(list[j]);
                }
            }
            returnJson.push(_j);
        }
        this.body = {data:returnJson};
    }
    //获取事件数量
    function *getCateCount(){
        var query = this.request.query,
            userId = query.userId;
    }
    //根据项目id获取所有事件
    function *getEventsByProject(){
        var query = this.request.query,
            projectId = query.projectId;

        var list = yield function(fn){
            D(module).find({projectId: projectId,status: 0},function(err,d){
                if(err)fn(err);
                fn(null,d);
            })
        }
        this.body = {data:list};
    }

    //添加事件
    function *addEvent(){

        var query = this.request.query,
            m = {
                name: query.name,
                deadLine: query.time,
                projectId: query.projectId,
                author: query.userId
            };

        var event = yield function(fn){
            D(module).insert(m,function(err,d){
                if(err)fn(err);
                fn(null,d);
            })
        }

        var project =  yield function(fn){
            D('project').findOne({_id: query.projectId},function(err,d){
                if(err)fn(err);
                fn(null,d);
            })
        }
        var projectUpdate = yield function(fn){
            D('project').findByIdAndUpdate(query.projectId,{eventCount: (project.eventCount + 1)}, function (err, d) {
                if(err)fn(err);
                fn(null,d);
            })
        }

        if(event){
            this.body = {data:true};
        }

        else this.body = {data:false};
    }

    //更新事件
    function *updateEvent(){
        var query = this.request.query,
            m = {
                id: query.id,
                name: query.name,
                deadLine: query.time,
                projectId: query.projectId
            };

        var event = yield function(fn){
            D(module).findByIdAndUpdate(m.id,m, function (err, d) {
                if(err)fn(err);
                fn(null,d);
            })
        }

        if(event){
            this.body = {data:true};
        }

        else this.body = {data:false};
    }
}