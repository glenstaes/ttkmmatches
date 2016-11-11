(function() {

    var getAddUserController = function(UsersController, UserService, player, accounts) {
        return function($scope, $mdDialog) {
            // Bind player
            $scope.player = player;
            $scope.accounts = accounts;

            // Method to cancel the dialog
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            // Hide the dialog when the user is added
            $scope.$on("users.account.added", function(event, account) {
                UsersController.refreshLists();
                $mdDialog.hide();
            });
        }
    }

    var UsersController = function(UtilityService, UserService, $mdDialog, $q, _withoutAccount, _withAccount) {
        var ctrl = this;

        /**
         * @private
         * @function splitPlayers
         * @description Splits the players into players for VTTL and players for Sporta
         * @return {Object} An object with the splitted players data, each federation has its own attribute on the object.
         */
        var splitPlayers = function(players){
            var vttl = [];
            var sporta = [];

            angular.forEach(players, function(player){
                if(player.federationId === 1){
                    vttl.push(player);
                } else if(player.federationId === 2){
                    sporta.push(player);
                }
            });

            return {
                VTTL: vttl,
                Sporta: sporta
            }
        }

        // Initialize to empty array
        ctrl.playersWithoutAccount = _withoutAccount;
        ctrl.playersWithAccount = splitPlayers(_withAccount);

        /**
         * @function refreshLists
         * @description Refreshes the three lists (No account, VTTL and Sporta)
         */
        ctrl.refreshLists = function() {
            // Get the players without an account
            UserService.getWithoutAccount().then(function(response) {
                ctrl.playersWithoutAccount = response;
            });

            // Get the players with an account
            UserService.getWithAccount().then(function(response) {
                ctrl.playersWithAccount = splitPlayers(response);
            });
        };

        /**
         * @function openNewAccountDialog
         * @description Opens the dialog for adding an account to a player.
         * @param {Object} player - The player to attach the account to.
         */
        ctrl.openNewAccountDialog = function(player) {
            $mdDialog.show({
                controller: getAddUserController(ctrl, UserService, player, ctrl.playersWithAccount),
                templateUrl: "app/js/pages/users/new-account.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullScreen: true
            });
        }
    };

    angular.module("matches").controller("UsersController", ["UtilityService", "UserService", "$mdDialog", "$q", "_withoutAccount", "_withAccount", UsersController]);

})();