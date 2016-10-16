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
            var deferred = $q.defer();

            $http.post(Api.getEndpoint("tabtseasons"), undefined, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            }).then(function (response) {
                if (angular.isObject(response)) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response);
                }
            }).catch(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        /**
         * @function getSeasons
         * @description Gets the seasons of the database
         * @returns {Promise} A promise that will be resolved with the seasons data or rejected with an error
         */
        s.getSeasons = function () {
            var deferred = $q.defer();

            $http.post(Api.getEndpoint("seasons"), undefined, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            }).then(function (response) {
                if (angular.isObject(response)) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response);
                }
            }).catch(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        return s;
    };

    angular.module("matches").factory("SeasonsService", ["ApiService", "UserService", "$http", "$q", SeasonsService]);
})();