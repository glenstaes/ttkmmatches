(function () {

    var SeasonsService = function (Api, UserService, $http, $q) {
        // Instantiate the service to an empty object
        var s = {};

        /**
         * @function getTabTSeasons
         * @description Gets the seasons of TabT
         * @returns {Promise} A promise that will be resolved with the seasons data or rejected with an error
         */
        s.getTabTSeasons = function () {
            return Api.quickCall("tabtseasons", undefined, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        /**
         * @function getSeasons
         * @description Gets the seasons of the database
         * @returns {Promise} A promise that will be resolved with the seasons data or rejected with an error
         */
        s.getSeasons = function () {
            return Api.quickCall("seasons", undefined, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        /**
         * @function newSeason
         * @description Contacts the API to create a new season
         * @returns {Promise} A promise that will be resolved with the data of the new season or rejected with an error
         */
        s.newSeason = function(season, name){
            return Api.quickCall("seasons-new", undefined, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        return s;
    };

    angular.module("matches").factory("SeasonsService", ["ApiService", "UserService", "$http", "$q", SeasonsService]);
})();