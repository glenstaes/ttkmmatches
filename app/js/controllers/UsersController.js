(function () {

    var UsersController = function (UtilityService, UserService, $mdDialog, $q) {
        var ctrl = this;

        UserService.getWithoutAccount();        
    };

    angular.module("matches").controller("UsersController", ["UtilityService", "UserService", "$mdDialog", "$q", UsersController]);

})();