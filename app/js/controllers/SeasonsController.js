(function () {

    var SeasonsController = function (_seasons, SeasonsService, UtilityService, $mdDialog, $q) {
        var ctrl = this;

        // Values
        ctrl.seasonMenuOpen = false;
        ctrl.loading = false;

        // Bind resolved data
        ctrl.seasons = [];
        ctrl.tabTSeasons;

        /**
         * @function prepareForNewSeason
         * @description Calls the api to get the TabT seasons and then opens the new season screen.
         */
        ctrl.prepareForNewSeason = function () {
            // Retrieve the TabT seasons
            SeasonsService.getTabTSeasons().then(function (response) {
                ctrl.tabTSeasons = response.SeasonEntries;
                ctrl.showNewSeasonScreen();
            }).catch(function (error) {
                UtilityService.showErrorToast("Er ging iets fout bij het ophalen van de seizoenen.");
            });
        };

        /**
         * @function refreshSeasons
         * @description Refreshes the seasons overview
         * @returns {Promise} A promise that is resolved when the request has completed
         */
        ctrl.refreshSeasons = function () {
            var deferred = $q.defer();

            ctrl.loading = true;

            SeasonsService.getSeasons().then(function (response) {
                ctrl.setSeasons(response);
                deferred.resolve(response);
            }).finally(function () {
                ctrl.loading = false;
            });

            return deferred.promise;
        };

        /**
         * @function showNewSeasonScreen
         * @description Shows the screen to start a new season. 
         * If the TabT seasons were not retrieved yet, it executes prepareForNewSeason() first.
         * When the user clicks the button to start a new season, startNewSeason() is called.
         */
        ctrl.showNewSeasonScreen = function () {
            if (ctrl.tabTSeasons) {
                $mdDialog.show({
                    controller: function ($scope, $mdDialog) {
                        // Method to hide the dialog
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };

                        // Method to cancel the dialog
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };

                        // Boilerplate for a new season
                        $scope.newSeason = {
                            season: "",
                            name: ""
                        };

                        // Bind to local scope
                        $scope.tabTSeasons = ctrl.tabTSeasons;

                        //Save the form
                        $scope.save = function () {
                            SeasonsService.newSeason($scope.newSeason.season, $scope.newSeason.name).then(function () {
                                $scope.hide();
                                ctrl.refreshSeasons();
                            }).catch(function (error) {
                                UtilityService.showErrorToast(error);
                            });
                        }
                    },
                    templateUrl: "app/js/pages/seasons/new.html",
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullScreen: true
                });
            } else {
                // First get the TabT seasons
                ctrl.prepareForNewSeason();
            }
        };

        /**
         * @function setSeasons
         * @description Does some stuff on the season objects and sets it as the seasons variable of the controller.
         * @param {Object[]} seasons - The season objects
         */
        ctrl.setSeasons = function (seasons) {
            if (angular.isDefined(seasons) && angular.isArray(seasons)) {
                angular.forEach(seasons, function (season) {
                    if (season.name !== season.customName) {
                        season.displayName = season.customName + " (" + season.name + ")";
                    } else {
                        season.displayName = season.name;
                    }
                });
                ctrl.seasons = seasons;
            }
        };

        // Initialization
        ctrl.setSeasons(_seasons);
    };

    angular.module("matches").controller("SeasonsController", ["_seasons", "SeasonsService", "UtilityService", "$mdDialog", "$q", SeasonsController]);

})();