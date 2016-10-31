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
         * @function getSeasons
         * @description Gets the details of a season
         * @param {int} id - The id of a season
         * @returns {Promise} A promise that will be resolved with the season details or rejected with an error
         */
        s.getSeason = function(id){
            return Api.quickCall("seasons-single", { id: id }, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        /**
         * @function newSeason
         * @description Contacts the API to create a new season
         * @param {String} season - The name of the season in the TabT database
         * @param {String} name - The custom name to use
         * @returns {Promise} A promise that will be resolved with the data of the new season or rejected with an error
         */
        s.newSeason = function(season, name){
            return Api.quickCall("seasons-new", {name: season, customName: name}, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        /**
         * @function updateSeason
         * @description Contacts the API to update a season
         * @param {Object} season - The season to update
         * @returns {Promise} A promise that will be resolved with the data of the updated season or rejected with an error
         */
        s.updateSeason = function(season){
            return Api.quickCall("seasons-update", {id: season.id, customName: season.customName}, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        /**
         * @function setAsCurrent
         * @description Sets the given season as the current season
         * @param {String} seasonId - The id of the season
         * @returns {Promise} A promise that will be resolved with the data of the season or rejected with an error
         */
        s.setAsCurrent = function(seasonId){
            return Api.quickCall("seasons-current", {id: seasonId}, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        /**
         * @function syncWithTabT
         * @description Updates the season with the latest TabT data
         * @param {String} seasonId - The id of the season
         * @returns {Promise} A promise that will be resolved with the data of the season or rejected with an error
         */
        s.syncWithTabT = function(seasonId){
            return Api.quickCall("seasons-sync", {id: seasonId}, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        /**
         * @function deleteSeason
         * @description Deletes the season
         * @param {String} seasonId - The id of the season
         * @returns {Promise} A promise that will be resolved with the a boolean indicating the deletion or rejected with an error
         */
        s.deleteSeason = function(seasonId){
            return Api.quickCall("seasons-delete", {id: seasonId}, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });
        };

        return s;
    };

    angular.module("matches").factory("SeasonsService", ["ApiService", "UserService", "$http", "$q", SeasonsService]);
})();