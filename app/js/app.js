(function(){
    // Instantiate the module
    angular.module("matches", ["ngRoute", "ngMaterial"]);

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
            }).otherwise("/");

        });
})();