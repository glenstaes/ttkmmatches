(function () {

    var LoginController = function ($mdToast, UserService, ErrorService, UtilityService) {
        var ctrl = this;

        // Redirect to the home page if the user is logged in already
        UserService.redirectIfLoggedIn();

        // Declaration
        ctrl.querying = false;          // Keeps track whether an api call is being made

        /**
         * @function ctrl.login 
         * @description Tries to login the user with the UserService.
         */
        ctrl.login = function () {
            if (angular.isUndefined(ctrl.user)) {
                // Create a toast that warns the user.
                UtilityService.showErrorToast("Fout: Geen logingegevens opgegeven");
            } else {
                ctrl.querying = true;
                UserService.login(ctrl.user.loginName, ctrl.user.password).then(function (response) {
                    if (UserService.isLoggedIn()) {
                        // Create a toast that welcomes the user.
                        UtilityService.showSuccessToast(["Welkom ", response.user.firstName, " ", response.user.lastName, "!"].join(""));

                        UserService.redirectIfLoggedIn();
                    }
                }).catch(function (response) {
                    if ((angular.isDefined(response.data) && angular.isDefined(response.data.error)) || angular.isDefined(response.error)) {
                        // Create a toast that warns the user.
                        UtilityService.showErrorToast(["Fout: ", ErrorService.getLocalErrorMessage(response.data ? response.data.error.code : response.error.code)].join(""));
                    }
                }).finally(function(){
                    ctrl.querying = false;   
                });
            }
        };

        /**
         * @function ctrl.onInputKeyUp
         * @description Manages the key up event of the form inputs. Submits the form if the enter key is pressed.
         */
        ctrl.onInputKeypress = function (e) {
            var code = e.which || e.keyCode;

            if (code === 13) {
                ctrl.login();
            }
        };
    };

    angular.module("matches").controller("LoginController", ["$mdToast", "UserService", "ErrorService", "UtilityService", LoginController]);
})();