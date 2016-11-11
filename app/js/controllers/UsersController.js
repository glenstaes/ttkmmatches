(function () {

    var UsersController = function (UtilityService, UserService, $mdDialog, $q) {
        var ctrl = this;

        // Initialize to empty array
        ctrl.playersWithoutAccount = [];

        // Get the players without an account
        UserService.getWithoutAccount().then(function(response){
            ctrl.playersWithoutAccount = response;
        });    
    };

    angular.module("matches").controller("UsersController", ["UtilityService", "UserService", "$mdDialog", "$q", UsersController]);

})();