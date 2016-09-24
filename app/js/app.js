(function(){
    // Instantiate the module
    angular.module("matches", ["ngMaterial"]);

    // Set the module configuration
    angular.module("matches")
        .config(function($mdThemingProvider){
            $mdThemingProvider.theme("default").primaryPalette("red").accentPalette("indigo");
        });
})();