define('helper', [], function() {
    var helper = function() {

        // 将特定时间字符串转换为  时间戳
        var getStamp = function(dateStr) {
            if (!dateStr) {
                return '';
            }
            var array = dateStr.match(/\d+/g),
                date = new Date(array[0] + '/' + array[1] + '/' + array[2] + ' ' + array[3] + ':' + array[4]);
            return date.getTime();
        };
        return {
            getStamp: getStamp
        };
    };
    return helper();
});