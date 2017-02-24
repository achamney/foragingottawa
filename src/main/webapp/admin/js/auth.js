(function() {
    var adminToken = getCookie("adminToken");
    if(!adminToken && !~window.location.href.indexOf("login.html")) {
        let url = window.location.href.substring(0, window.location.href.indexOf("admin"));
        window.location.href = url+"admin/login.html";
    }
})();