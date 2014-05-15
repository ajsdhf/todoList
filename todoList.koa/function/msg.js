/**
 * Created by zhenyi.shi on 14-5-15.
 */


module.exports = function (msg,url,title,second){
    msg = msg||'';
    url= url||'/';
    title=title||msg;
    second=second||2;
    return G.render('msg',{msg:msg,second:second,url:url,title:title});
}