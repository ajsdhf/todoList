/**
 * Created by zhenyi.shi on 14-5-14.
 */
module.exports = function (origin, add) {
    if (!add || typeof add !== 'object') return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
        origin[keys[i]] = add[keys[i]];
    }
    return origin;
}