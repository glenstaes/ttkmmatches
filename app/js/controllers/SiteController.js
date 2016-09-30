(function () {
    var SiteController = function ($mdMedia, $mdSidenav, $location, UserService) {
        var ctrl = this;

        // Bind services to controller so they can be used in the template
        ctrl.UserService = UserService;

        // Boolean to check whether the top right speed dial fab is opened.
        ctrl.isSpeedDialOpen = false;

        // Holds the general menu items
        ctrl.generalNavItems = [{
            icon: "fa-home",
            link: "/",
            label: "Startpagina"
        }, {
                icon: "fa-list",
                link: "/",
                label: "Mijn opstellingen"
            }, {
                icon: "fa-calendar-check-o",
                link: "/",
                label: "Mijn beschikbaarheden"
            }];

        /**
         * @function ctrl.isGtMd
         * @description Checks whether the width of the window is larger than a medium device width.
         * @returns {Boolean} True if the width is larger than medium, false if not.
         */
        ctrl.isGtMd = function () {
            return $mdMedia('gt-md');
        };

        /**
         * @function ctrl.toggleMenu
         * @description Toggles the side navigation menu.
         */
        ctrl.toggleMenu = function () {
            $mdSidenav("left").toggle();
        };

        /**
         * @function ctrl.isSideNavAllowed
         * @description Checks if the user is allowed to see the side navigation. The side navigation
         * can be seen when the user is logged in.
         */
        ctrl.isSideNavAllowed = function () {
            return UserService.isLoggedIn();
        };

        /**
         * @function ctrl.navigateTo
         * @description Navigates the user to the provided menu items
         * @param {Object} menuItem - The menu item that the user needs to navigate to
         */
        ctrl.navigateTo = function (menuItem) {
            if (angular.isDefined(menuItem) && menuItem !== null)
                $location.path(menuItem.link);
        };
    };

    angular.module("matches").controller("SiteController", ["$mdMedia", "$mdSidenav", "$location", "UserService", SiteController]);
})();