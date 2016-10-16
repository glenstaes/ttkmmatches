(function () {

    var SeasonsController = function (_seasons, SeasonsService, UtilityService, $mdDialog) {
        var ctrl = this;

        // Bind resolved data
        ctrl.seasons = _seasons;
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
            }).catch(function(error){
                UtilityService.showErrorToast("Er ging iets fout bij het ophalen van de seizoenen.");
            });
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

                        // Save the form
                        // $scope.save = function(){
                        //     SeasonsService.newSeason($scope.newSeason).then(function(){
                        //         $scope.hide();
                        //     }).catch(function(error){
                        //         UtilityService.showErrorToast(error);
                        //     });
                        // }
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
    };

    angular.module("matches").controller("SeasonsController", ["_seasons", "SeasonsService", "UtilityService", "$mdDialog", SeasonsController]);

})();