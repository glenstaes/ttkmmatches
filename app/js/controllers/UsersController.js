(function () {

    var getAddUserController = function (UserService, player) {
        return function ($scope, $mdDialog) {
            // Bind player
            $scope.player = player;

            // Method to cancel the dialog
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            // Hide the dialog when the user is added
            $scope.$on("users.account.added", function(event, account){
                $mdDialog.hide();
            });
        }
    }

    var UsersController = function (UtilityService, UserService, $mdDialog, $q) {
        var ctrl = this;

        // Initialize to empty array
        ctrl.playersWithoutAccount = [];

        // Get the players without an account
        UserService.getWithoutAccount().then(function (response) {
            ctrl.playersWithoutAccount = response;
        });

        /**
         * @function openNewAccountDialog
         * @description Opens the dialog for adding an account to a player.
         * @param {Object} player - The player to attach the account to.
         */
        ctrl.openNewAccountDialog = function (player) {
            $mdDialog.show({
                controller: getAddUserController(UserService, player),
                templateUrl: "app/js/pages/users/new-account.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullScreen: true
            });
        }
    };

    angular.module("matches").controller("UsersController", ["UtilityService", "UserService", "$mdDialog", "$q", UsersController]);

})();