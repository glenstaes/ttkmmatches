(function(){

    var membersListComponent = function(){
        var ctrl = this;
    };

    angular.module("matches").component("membersList", {
        templateUrl: "app/js/components/members-list/template.html",
        controller: [membersListComponent],
        require: {
            ngModel: "ngModel"
        }
    });
    
})();