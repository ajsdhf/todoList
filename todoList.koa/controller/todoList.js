/**
 * Created by zhenyi.shi on 14-5-14.
 */

module.exports = function(module,app,route,parse,render){
    app.use(route.get('/', list));

    function *list(tag) {

        console.log(G.user);
        if(G.user && G.user.id){
            

            this.body = yield render('todolist/index',{});
        }

        this.body = yield render('index',{});
    }


}