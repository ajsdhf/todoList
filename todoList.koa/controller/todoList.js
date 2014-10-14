/**
 * Created by zhenyi.shi on 14-5-14.
 */

module.exports = function(module,app,route,parse,render){
    app.use(route.get('/', todo));
    app.use(route.get('/today', today));



    //主页框架
    function *todo() {
        //console.log(G.user);
        if(G.user && G.user.id){
            this.body = yield render('/todolist/todo');
        }

        else this.body = yield render('/auth/login',{});
    }

    //今天
    function *today(){

        var query = this.request.query;

        this.body = {data:'test'};
    }
}