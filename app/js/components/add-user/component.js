(function () {

    var addUserComponent = function (RelationTypesService, UserService, U, $scope) {
        var ctrl = this;

        // Instantiate form
        ctrl.relationTypes = [];
        ctrl.existingAccounts = [];
        ctrl.isLoadingAccounts = true;

        // Bind player data
        ctrl.newAccount = {
            firstName: ctrl.player.firstName,
            lastName: ctrl.player.lastName,
            email: ctrl.player.email
        }

        // Get all the relation types
        RelationTypesService.getAllCached().then(function (result) {
            ctrl.relationTypes = result;
        });

        // Get all the accounts
        UserService.getAccounts().then(function(result){
            ctrl.isLoadingAccounts = false;
            ctrl.existingAccounts = result;
        });

        /**
         * @function saveNewAccount
         * @description Saves a new account that is attached to the player
         * @param {Object} account - The new account
         */
        ctrl.saveNewAccount = function (account) {
            var saveData = {
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
                playerUniqueIndex: ctrl.player.uniqueIndex,
                relationTypeId: account.relationType.id
            }

            // Save
            UserService.saveNewAccount(saveData).then(function (result) {
                U.showSuccessToast("Account created for " + result.firstName + " " + result.lastName);
                $scope.$emit("users.account.added", result);
            }).catch(function (error) {
                U.showErrorToast("Could not save account: " + error);
            });
        }
    };

    angular.module("matches").component("addUser", {
        templateUrl: "app/js/components/add-user/template.html",
        controller: ["RelationTypesService", "UserService", "UtilityService", "$scope", addUserComponent],
        bindings: {
            player: "<"
        }
    });

})();