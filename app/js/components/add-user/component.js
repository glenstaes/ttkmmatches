(function() {

    var addUserComponent = function(RelationTypesService, UserService, U, $scope) {
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
        RelationTypesService.getAllCached().then(function(result) {
            ctrl.relationTypes = result;
        });

        // Get all the accounts
        UserService.getAccounts().then(function(result) {
            ctrl.isLoadingAccounts = false;
            ctrl.existingAccounts = result;
        });

        /**
         * @function saveNewAccount
         * @description Saves a new account that is attached to the player
         * @param {Object} account - The new account
         */
        ctrl.saveNewAccount = function(account) {
            var saveData = {
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
                playerUniqueIndex: ctrl.player.uniqueIndex,
                relationTypeId: account.relationType.id
            }

            // Save
            UserService.saveNewAccount(saveData).then(function(result) {
                U.showSuccessToast("Account aangemaakt voor " + result.firstName + " " + result.lastName);
                $scope.$emit("users.account.added", result);
            }).catch(function(error) {
                U.showErrorToast("Could not save account: " + error);
            });
        };

        /**
         * @function attachAccounts
         * @description Attaches the selected accounts to the player
         */
        ctrl.attachAccounts = function(){
            if(ctrl.isExistingAccountSelected()){
                var managedPlayers = [];
                angular.forEach(ctrl.getSelectedExistingAccounts(), function(account){
                    managedPlayers.push({
                        relationTypeId: account.attachToPlayer.relationType.id,
                        userId: account.id
                    });
                });

                UserService.attachAccounts(ctrl.player.uniqueIndex, managedPlayers).then(function(result){
                    U.showSuccessToast("Speler " + result.firstName + " " + result.lastName + " heeft nu " + result.accounts.length + " gekoppelde accounts.");
                    $scope.$emit("users.account.added");
                });
            }
        }

        /**
         * @function isExistingAccountSelected
         * @description Checks whether an existing account is selected to attach to the player.
         * @return {boolean} True if one or more accounts is selected, false if not.
         */
        ctrl.isExistingAccountSelected = function() {
            return ctrl.getSelectedExistingAccounts().length > 0;
        };

        /**
         * @function getSelectedExistingAccounts
         * @description Gets the selected existing accounts that should be attached to the player.
         * @return {Object[]} An array of selected accounts.
         */
        ctrl.getSelectedExistingAccounts = function() {
            var selected = [];

            angular.forEach(ctrl.existingAccounts, function(account) {
                if (angular.isDefined(account.attachToPlayer) && account.attachToPlayer.enabled) {
                    selected.push(account);
                }
            });

            return selected;
        };
    };

    angular.module("matches").component("addUser", {
        templateUrl: "app/js/components/add-user/template.html",
        controller: ["RelationTypesService", "UserService", "UtilityService", "$scope", addUserComponent],
        bindings: {
            player: "<"
        }
    });

})();