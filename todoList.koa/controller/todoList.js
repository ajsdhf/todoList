/**
 * Created by zhenyi.shi on 14-5-14.
 */

module.exports = function(module,app,route,parse,render){
    app.use(route.get('/', list));

    function *list(tag) {
        this.body = yield render('index',{});
    }


}