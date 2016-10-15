(function(){
    // Instantiate the module
    angular.module("matches", ["ngRoute", "ngMaterial", "smart-table"]);

    // Set the module configuration
    angular.module("matches")
        .config(function($mdThemingProvider, $routeProvider){
            // Set the default application theme
            $mdThemingProvider.theme("default").primaryPalette("red").accentPalette("indigo");

            $mdThemingProvider.theme("success-toast");
            $mdThemingProvider.theme("error-toast");

            // Configure the routes
            $routeProvider.when("/", {
                controller: "DashboardController",
                controllerAs: "DashboardCtrl",
                templateUrl: "app/js/pages/dashboard.html"
            }).when("/login", {
                controller: "LoginController",
                controllerAs: "LoginCtrl",
                templateUrl: "app/js/pages/login.html"
            }).when("/sterktelijst/vttl", {
                controller: "MembersController",
                controllerAs: "MembersCtrl",
                templateUrl: "app/js/pages/members.html",
                resolve: {
                    _members: ["MembersService", function(MembersService){
                        return MembersService.getMembers();
                    }],
                    _federation: function(){
                        return "VTTL";
                    }
                }
            }).when("/sterktelijst/sporta", {
                controller: "MembersController",
                controllerAs: "MembersCtrl",
                templateUrl: "app/js/pages/members.html",
                resolve: {
                    _members: ["MembersService", function(MembersService){
                        return MembersService.getMembers();
                    }],
                    _federation: function(){
                        return "Sporta"
                    }
                }
            }).otherwise("/");

        });
})();