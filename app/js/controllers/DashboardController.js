(function(){
    var DashboardController = function(UserService){
        var ctrl = this;

        // Redirect to the homepage if the user is not logged in
        UserService.redirectIfNotLoggedIn();
    };

    angular.module("matches").controller("DashboardController", ["UserService", DashboardController]);

})();