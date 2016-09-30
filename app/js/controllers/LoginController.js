(function () {

    var LoginController = function ($mdToast, UserService, ErrorService) {
        var ctrl = this;

        // Redirect to the home page if the user is logged in already
        UserService.redirectIfLoggedIn();

        // Mockout the user
        ctrl.user = {
            loginName: "staeseke@gmail.com",
            password: "test"
        }

        /**
         * @function login 
         * @description Tries to login the user with the UserService.
         */
        ctrl.login = function () {
            UserService.login(ctrl.user.loginName, ctrl.user.password).then(function (response) {
                if (UserService.isLoggedIn()) {
                    // Create a toast that welcomes the user.
                    var toast = $mdToast.simple().content(["Welkom ", response.user.firstName, " ", response.user.lastName, "!"].join("")).theme("success-toast").position("top right");

                    // Show the toast
                    $mdToast.show(toast);

                    UserService.redirectIfLoggedIn();
                }
            }).catch(function (response) {
                if(angular.isDefined(response.error)){
                    // Create a toast that welcomes the user.
                    var toast = $mdToast.simple().content(["Fout: ", ErrorService.getLocalErrorMessage(response.error.code)].join("")).theme("error-toast").position("top right");

                    // Show the toast
                    $mdToast.show(toast);
                }
            });
        }
    };

    angular.module("matches").controller("LoginController", ["$mdToast", "UserService", "ErrorService", LoginController]);
})();