(function(){
    var SiteController = function($mdMedia, $mdSidenav){
        var ctrl = this;

        // Boolean to check whether the top right speed dial fab is opened.
        ctrl.isSpeedDialOpen = false;

        // Holds the general menu items
        ctrl.generalNavItems = [{
            icon: "fa-home",
            link: "#/",
            label: "Startpagina"
        },{
            icon: "fa-list",
            link: "#/",
            label: "Mijn opstellingen"
        },{
            icon: "fa-calendar-check-o",
            link: "#/",
            label: "Mijn beschikbaarheden"
        }];

        /**
         * @function ctrl.isGtMd
         * @description Checks whether the width of the window is larger than a medium device width.
         * @returns {Boolean} True if the width is larger than medium, false if not.
         */
        ctrl.isGtMd = function(){
            return $mdMedia('gt-md');
        };

        /**
         * @function ctrl.toggleMenu
         * @description Toggles the side navigation menu.
         */
        ctrl.toggleMenu = function(){
            $mdSidenav("left").toggle();
        };

        ctrl.navigateTo = function(menuItem){
            alert("Navigate to " + menuItem.link);
        };
    };

    angular.module("matches").controller("SiteController", ["$mdMedia", "$mdSidenav", SiteController]);
})();