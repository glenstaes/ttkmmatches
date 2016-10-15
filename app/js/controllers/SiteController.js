(function () {
    var SiteController = function ($mdMedia, $mdSidenav, $location, $rootScope, UserService) {
        var ctrl = this;

        // Bind services to controller so they can be used in the template
        ctrl.UserService = UserService;
        ctrl.nextRoute = { };

        // Holds the general menu items
        ctrl.generalNavItems = [
            // First group: General
            [{
                icon: "fa-home",
                link: "/",
                label: "Dashboard"
            }],
            // Second group: Members
            [{
                icon: "fa-users",
                link: "/sterktelijst/sporta",
                label: "Sterktelijst Sporta"
            }, {
                    icon: "fa-users",
                    link: "/sterktelijst/vttl",
                    label: "Sterktelijst VTTL"
                }],
            // Third group: Logout
            [{
                icon: "fa-sign-out",
                click: function () {
                    ctrl.logout();
                },
                label: "Uitloggen"
            }]
        ];

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
            if (angular.isDefined(menuItem) && menuItem !== null) {
                // Determine link or action
                if (angular.isDefined(menuItem.link)) {
                    // Navigate to the route
                    $location.path(menuItem.link);
                } else if (angular.isFunction(menuItem.click)) {
                    // Execute the click function
                    menuItem.click();
                }

                // Close the sidenav if it is open on mobile
                if (!ctrl.isGtMd())
                    ctrl.toggleMenu();
            }
        };

        /**
         * @function ctrl.logout
         * @description Tries to logout the user
         */
        ctrl.logout = function () {
            UserService.logout();
            UserService.redirectIfNotLoggedIn();
        }

        // Listen to the state change events to show the indicator
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            ctrl.nextRoute = next.$$route;
        });
        $rootScope.$on("$routeChangeSuccess", function(event, current, previous){
            ctrl.nextRoute = {};
        });
    };

    angular.module("matches").controller("SiteController", ["$mdMedia", "$mdSidenav", "$location", "$rootScope", "UserService", SiteController]);
})();