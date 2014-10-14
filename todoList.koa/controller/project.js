/**
 * Created by zhenyi.shi on 14-6-12.
 */

module.exports = function(module,app,route,parse,render){
    app.use(route.get('/'+module+'/getProjects', getProjects));
    app.use(route.get('/'+module+'/addProject', addProject));

    //获取所有项目
    function *getProjects(){

        var query = this.request.query,
            useId = query.userId;

        var list = yield function(fn){
            D(module).find({author: useId,status: 0},function(err,d){
                if(err)fn(err);
                fn(null,d);
            })
        }

        this.body = {data:list};
    }

    //添加项目
    function *addProject(){

        var query = this.request.query;
            m = {
                name: query.projectName,
                author: query.userId
            };

        var project = yield function(fn){
            D(module).insert(m,function(err,d){
                if(err)fn(err);
                fn(null,d);
            })
        }

        if(project){
            this.body = {data:project._id};
        }

        else this.body = {data:false};
    }
}