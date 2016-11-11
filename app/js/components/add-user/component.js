(function(){

    var addUserComponent = function(RelationTypesService, $scope){
        var ctrl = this;

        // Instantiate form
        ctrl.relationTypes = [];

        // Bind player data
        ctrl.newAccount = {
            firstName: ctrl.player.firstName,
            lastName: ctrl.player.lastName,
            email: ctrl.player.email
        }

        // Get all the relation types
        RelationTypesService.getAllCached().then(function(result){
            ctrl.relationTypes = result;
        });

        /**
         * @function saveNewAccount
         * @description Saves a new account that is attached to the player
         * @param {Object} account - The new account
         */
        ctrl.saveNewAccount = function(account){
            alert("TODO");
            $scope.$emit("users.account.added", account);
        }
    };

    angular.module("matches").component("addUser", {
        templateUrl: "app/js/components/add-user/template.html",
        controller: ["RelationTypesService", "$scope", addUserComponent],
        bindings: {
            player: "<"
        }
    });
    
})();