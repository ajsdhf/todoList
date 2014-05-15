/**
 * Created by zhenyi.shi on 14-5-15.
 */
module.exports = function(stringToSearch, arrayToSearch){
    console.log(stringToSearch, arrayToSearch);
    for (s = 0; s < arrayToSearch.length; s++) {
       var thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;

}