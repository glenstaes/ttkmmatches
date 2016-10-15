(function(){

    var MembersController = function(_members, _federation){
        var ctrl = this;

        // Bind controller resolves to scope
        ctrl.members = _members;
        ctrl.federation = _federation;
    };

    angular.module("matches").controller("MembersController", ["_members", "_federation", MembersController]);

})();