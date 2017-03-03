define([
    "quickforms/server/getFactData"
], function () {
    function response(data) {
        if (!isJSONString(data)) {
            setCookie('username', '');
            alert("Warning: logged out");
        }
    }
    window.setInterval(function () {
        if(getCookie('token')) {
            quickforms.getFactData({
                queryName: 'heartbeat',
                params: 'token=' + getCookie('token'),
                callback: response
            });
        }
    }, 60000)
});